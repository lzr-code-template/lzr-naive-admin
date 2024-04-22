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

interface TableInter {
  loading: boolean
  list: any[]
  getList: (more: boolean) => void
  pagination: any
  columns: any[]
  handleFiltersChange: (filters: DataTableFilterState) => void
}

export { 
  ParamsInter,
  FilterInter,
  TableInter
}