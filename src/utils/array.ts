// 非空数组判断
export function isNonEmptyArray(arr: any[]): boolean {
  return Array.isArray(arr) && arr.length > 0
}

// 检查传入的 val 是否为 null 或者 undefined
export function isNullOrUndef(val: any): boolean {
  return val === null || val === undefined
}
