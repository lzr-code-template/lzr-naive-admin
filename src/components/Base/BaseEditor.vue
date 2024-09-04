<template>
  <div class="w-full border">
    <Toolbar
      :editor="editorRef"
      :default-config="toolbarConfig"
      class="border-b"
    />
    <Editor
      v-model="val"
      :default-config="editorConfig"
      style="overflow-y: hidden"
      :style="{ height: `${props.height}px` }"
      @on-created="(editor: any) => handleCreated(editor)"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useEditor } from '@/composables/useEditor'

const props = defineProps({
  modelValue: String,
  url: {
    type: String,
    default: '/open/addpic',
  },
  height: {
    type: Number,
    default: 300,
  },
})
const emit = defineEmits(['update:modelValue'])
const val = ref(props.modelValue)
watch(() => val.value, (newVal) => {
  emit('update:modelValue', newVal)
})

/** 编辑器相关 */
const { toolbarConfig, editorConfig } = useEditor(`${import.meta.env.VITE_APP_URL + props.url}`)
const editorRef = shallowRef()
const handleCreated = (editor: any) => {
  editorRef.value = editor
}
</script>
