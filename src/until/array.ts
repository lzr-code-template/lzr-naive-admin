// 非空数组判断
function isNonEmptyArray(arr: any[]): boolean {
  return Array.isArray(arr) && arr.length > 0
}

export {
  isNonEmptyArray
}