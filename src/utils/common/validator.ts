// 校验手机号
const validatorMobile = (value: string, errorText = '手机号格式不正确') => {
  if (value.length > 0) {
    if (!/^1[3-9]\d{9}$/.test(value)) {
      return new Error(errorText)
    }
    else {
      return true
    }
  }
}
// 校验上传图片
const validatorUploadImg = (value: any, errorText = '请上传图片') => {
  if (!value || value.length === 0) { return new Error(errorText) }
  if (value && value.length > 0) {
    return true
  }
}
// 校验富文本
const validatorEditor = (value: string, errorText = '请输入内容') => {
  const getText = (str: string) => {
    return str
      .replace(/<[^<p>]+>/g, '') // 将所有<p>标签 replace ''
      .replace(/<[</p>$]+>/g, '') // 将所有</p>标签 replace ''
      .replace(/&nbsp;/gi, '') // 将所有 空格 replace ''
      .replace(/<[^<br/>]+>/g, '') // 将所有 换行符 replace ''
  }
  const isNull = (str: string) => {
    if (str === '') { return true }
    const regu = '^ +$'
    const re = new RegExp(regu)
    return re.test(str)
  }
  if (isNull(getText(value))) {
    return new Error(errorText)
  }
  else {
    return true
  }
}
export {
  validatorMobile,
  validatorUploadImg,
  validatorEditor,
}
