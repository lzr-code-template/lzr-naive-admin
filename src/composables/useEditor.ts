import type { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

type InsertFnType = (url: string, alt: string, href: string) => void

export function useEditor(action = `${import.meta.env.VITE_APP_URL}/open/addpic`) {
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'bold', 'italic','underline', 'color', 'bgColor',  '|',
      'fontSize', 'lineHeight', '|',
      'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify', 'clearStyle', 'indent', 'delIndent', '|',
      'emotion', 'uploadImage', 'divider', 'bulletedList', 'numberedList', 'insertTable'
    ]
  }
  const editorRef = shallowRef()
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '在这里输入内容...',
    autoFocus: false,
    readOnly: false,
    MENU_CONF: {}
  }
  // 行高
  editorConfig.MENU_CONF['lineHeight'] = {
    lineHeightList: ['1.25', '1.5', '1.75', '2', '2.25', '2.5', '3']
  }
  // 字体大小
  // editorConfig.MENU_CONF['fontSize'] = {
  //   fontSizeList: [ '10pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt', '28pt', '32pt', '36pt', '40pt', '44pt', '48pt', '52pt', '60pt']
  // }
  // 上传图片
  editorConfig.MENU_CONF['uploadImage'] = {
    server: action,
    fieldName: 'file',
    maxFileSize: 5120000,
    timeout: 30 * 1000,
    maxNumberOfFiles: 20,
    headers: {
      Authorization: $cookies.get('token')
    },
    customInsert(res: any, insertFn: InsertFnType) {
      if (res.code === 200) insertFn(res.data, '图片', '')
      if (res.code !== 200) ElMessage({ message: res.msg, type: 'error'})
    },
    onError(file: File, err: any, res: any) {
      if (file.size > 5120000) {
        ElMessage({ message: '图片大小不得超过5MB', type: 'warning'})
        return
      }
      ElMessage({ message: `${file.name} 上传出错`, type: 'error'})
    }
  }

  const changeContent = (richText: string) => {
    let matchResult = richText.match(/^<p[^>]*>/)
    if (matchResult) {
      // 提取p标签
      let pTag = matchResult[0];
      // 使用正则表达式匹配p标签中的style属性
      let styleMatchResult = pTag.match(/style\s*=\s*"([^"]*)"/);
      if (styleMatchResult) {
        pTag = pTag.replace(styleMatchResult[1], 'margin: 0');
      } else {
        // 如果不存在style属性，添加style属性并设置为您要的样式
        pTag = pTag.replace(/^<p/, '<p style="margin: 0"');
      }
      return pTag
    }
  }

  const handleCreated = (editor: any) => {
    editorRef.value = editor
  }
  
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  return { 
    toolbarConfig, 
    editorRef, 
    editorConfig,
    changeContent,
    handleCreated,
  }
}