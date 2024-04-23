interface ParamsInter {
  size: number
  currentPage: number
  name: string
  zaixian: number | null
}

interface FilterInter {
  height: number
  data: {
    name: string
    zaixian: number | null
  }
  zaixianOptions: {
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