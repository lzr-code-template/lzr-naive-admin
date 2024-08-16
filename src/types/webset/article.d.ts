interface ParamsInter {
  size: number
  currentPage: number
  clazzid: number | null
}

interface FilterInter {
  height: number
  data: {
    clazzid: number | null
  }
  clazzOptions: {
    label: string
    value: number
  }[]
  reset: () => void
  search: () => void
}

export { 
  ParamsInter,
  FilterInter
}
