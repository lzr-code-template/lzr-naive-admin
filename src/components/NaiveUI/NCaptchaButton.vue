<template>
  <n-throttle-button
    :="_attrs"
    :disabled="btn.disabled"
    :text="btn.text"
    @click="getCaptcha"
  />
</template>

<script setup lang="ts">
import api from '@/api/index'

interface Props {
  url: string
  time?: number
  mobile: string
}
const props = withDefaults(defineProps<Props>(), {
  url: '',
  time: 30,
  mobile: '',
})

const message = useMessage()
const _attrs = useAttrs()

// 按钮
const btn = reactive({
  text: '发送验证码',
  disabled: false,
})

// 获取验证码
const getCaptcha = () => {
  if (!props.mobile) {
    message.warning('请填写手机号')
    return
  }
  btn.disabled = true
  let i = props.time
  btn.text = `${i}s后重新发送`
  const timer = setInterval(() => {
    i -= 1
    btn.text = `${i}s后重新发送`
    if (i === 0) {
      clearInterval(timer)
      btn.text = '发送验证码'
      btn.disabled = false
    }
  }, 1000)
  api.get('/open/getCaptcha', { mobile: props.mobile }).then((res) => {
    if (res.code === 20000) {
      //
    }
    else {
      clearInterval(timer)
      btn.text = '发送验证码'
      btn.disabled = false
    }
  })
}
</script>
