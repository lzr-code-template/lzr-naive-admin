<template>
  <div>
    <n-upload
      v-model:file-list="fileList"
      :action="props.action"
      :accept="props.accept"
      :headers="headers"
      :max-size="maxSize * 1024 * 1024"
      :before-upload="beforeUpload"
      v-bind="$attrs"
      @finish="onFinish"
      @change="onChange"
      @error="onError"
      @preview="handlePreview"
    >
      <slot>
        <n-button>上传文件</n-button>
      </slot>
    </n-upload>
    <!-- 图片预览弹窗 -->
    <n-modal
      v-model:show="previewModal.show"
      preset="card"
      class="w-[600px]"
    >
      <img :src="previewModal.imgUrl" class="w-full" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import type { UploadFileInfo } from 'naive-ui'

interface Props {
  action: string // 上传地址
  accept?: string // 接受的文件类型
  maxSize?: number // 文件最大大小，单位 MB
  fileList?: UploadFileInfo[] // 文件列表
  max?: number // 最大上传数量
}

const props = withDefaults(defineProps<Props>(), {
  maxSize: 5,
  accept: undefined,
  fileList: () => [],
  max: undefined,
})

const emit = defineEmits(['update:fileList', 'change'])

// 文件列表
const fileList = ref<UploadFileInfo[]>(props.fileList)

// 请求头
const headers = {
  Authorization: window.localStorage.getItem('token') || '',
}

// 预览模态框状态
const previewModal = reactive({
  show: false,
  imgUrl: '',
})

// 上传前校验
const beforeUpload = (data: { file: UploadFileInfo }) => {
  const { file } = data

  // 检查文件大小
  const isLtMaxSize = (file.file?.size || 0) < props.maxSize * 1024 * 1024
  if (!isLtMaxSize) {
    window.$message?.error(`文件大小不能超过 ${props.maxSize}MB`)
    return false
  }

  return true
}

// 上传完成回调
const onFinish = ({ file, event }: { file: UploadFileInfo, event?: ProgressEvent & { target: XMLHttpRequest } }) => {
  if (event?.target) {
    const response = JSON.parse(event.target.response)
    if (response.code === 200) {
      file.url = response.data.url
      window.$message?.success('上传成功')
    }
    else {
      window.$message?.error('上传失败')
    }
  }
}

// 文件列表变化回调
const onChange = ({ file, fileList }: { file: UploadFileInfo, fileList: UploadFileInfo[] }) => {
  if (file.status === 'finished' && file.url) {
    const formattedList = fileList.map(item => ({
      id: item.id,
      name: item.name,
      url: item.url,
      status: 'finished',
    }))
    emit('change', formattedList)
    emit('update:fileList', formattedList)
  }
}

// 上传错误回调
const onError = () => {
  window.$message?.error('上传失败，请重试')
}

// 预览图片
const handlePreview = (file: UploadFileInfo) => {
  if (file.url) {
    previewModal.imgUrl = file.url
    previewModal.show = true
  }
}

// 监听父组件传入的文件列表变化
watch(() => props.fileList, (newValue) => {
  fileList.value = newValue
}, { deep: true })
</script>
