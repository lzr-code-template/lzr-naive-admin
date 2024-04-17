interface ParamsInter {
  size: number
  currentPage: number
  name: string
  zaixian: string | null
}

interface FilterInter {
  height: number
  data: {
    name: string
    zaixian: string | null
  }
  zaixianOptions: {
    label: string
    value: string
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