<template>
  <div class="py-4">
    <h2 class="text-lg font-bold">新建文章</h2>
    <div class="mt-7 px-20">
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-placement="left"
        label-width="110"
        require-mark-placement="left"
      >
        <n-form-item label="文章标题：" path="title" class="w-1/2">
          <n-input
            v-model:value="form.title"
            placeholder="请输入文章标题"
            clearable
          />
        </n-form-item>
        <n-form-item label="文章类型：" path="clazzid" class="w-1/2">
          <n-select
            v-model:value="form.clazzid"
            placeholder="请选择文章类型"
            :options="clazzOptions"
            clearable
            @update:value="clazzChange"
          />
        </n-form-item>
        <n-form-item label="排序值：" path="ordervalue">
          <div class="w-full space-y-2">
            <div class="f-c w-full space-x-2">
              <n-input-number
                v-model:value="form.ordervalue"
                :precision="0"
                :min="1"
                :max="99999"
                clearable
              />
              <div class="f-c space-x-1 text-placeholder">
                <p>↓</p>
                <div class="text-xs">
                  <p>9</p>
                  <p>1</p>
                </div>
              </div>
            </div>
            <p class="text-xs text-placeholder">文章顺序将按照数字降序的方式展示</p>
          </div>
        </n-form-item>
        <n-form-item label="文章内容：" path="content">
          <BaseEditor v-model="form.content" />
        </n-form-item>
        <n-form-item>
          <div class="f-c-c mt-4 w-full space-x-4">
            <div class="w-20">
              <n-button
                attr-type="button"
                block
                @click="$router.back()"
              >
                取消
              </n-button>
            </div>
            <div class="w-20">
              <n-throttle-button
                type="primary"
                :loading="btnLoading"
                block
                text="保存"
                @click="handleValidateClick"
              />
            </div>
          </div>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInst, FormItemRule, SelectGroupOption, SelectOption } from 'naive-ui'
import api from '@/api/index'
import { useKeepaliveStore } from '@/store'
import { validatorEditor } from '@/utils'
import BaseEditor from '@/components/Base/BaseEditor.vue'

interface FormRules { [itemValidatePath: string]: FormItemRule | Array<FormItemRule> | FormRules }

const router = useRouter()
const btnLoading = ref<boolean>(false)

/** 表单 */
const formRef = ref<FormInst | null>()
const form = reactive({
  clazzid: null, // 类型id
  clazzname: '', // 类型名称
  title: '', // 文章标题
  content: '', // 文章内容
  ordervalue: null, // 排序值
})
const rules: FormRules = {
  title: [{ required: true, message: '请输入文章标题', trigger: ['blur', 'input'] }],
  clazzid: [{ required: true, type: 'number', message: '请选择文章类型', trigger: ['blur', 'change'] }],
  ordervalue: [{ required: true, type: 'number', message: '请输入排序值', trigger: ['blur', 'input'] }],
  content: [{ required: true, validator: (rule: FormItemRule, value: any) => validatorEditor(value, '请填写文章内容') }],
}

/** 文章类型 */
const clazzOptions = ref<Array<SelectOption | SelectGroupOption>>([])
const clazzChange = (val: any, option: any) => {
  form.clazzname = option ? option.label : ''
}

/** 保存数据 */
const handleValidateClick = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      $message?.loading('保存中...')
      btnLoading.value = true
      api.post('/article/addArticle', form).then((res) => {
        if (res.code === 200) {
          useKeepaliveStore().removeKeepAlive('WebsetArticle')
          $message?.destroyAll()
          $message?.success('操作成功')
          nextTick(() => router.back())
        }
        else {
          $message?.destroyAll()
          btnLoading.value = false
        }
      })
    }
    else {
      errors.forEach((item) => {
        $message?.warning(item[0].message as string)
      })
    }
  })
}

/** 获取文章类型 */
const articleRes = await api.get('/article/getArticleClazz')
if (articleRes.code === 200) { clazzOptions.value = articleRes.data }
</script>
