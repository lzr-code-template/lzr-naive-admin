interface ParamsInter {
  size: number
  currentPage: number
  name: string
  roleid: number | null
  zaixian: string | null
}

interface FilterInter {
  height: number
  data: {
    name: string
    roleid: number | null
    zaixian: string | null
  }
  roleOptions: {
    id: number
    name: string
  }[]
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

interface ModalInter {
  show: boolean
  loading: boolean
  btnLoading: boolean
  title: string
  genderOptions: {
    label: string
    value: string
  }[]
  data: {
    id: number | null
    name: string
    gender: string
    roleid: number | null
    zaixian: string | null
    mobile: string
  }
  rules: any
  init: () => void
  open: (type: string, id: number | null) => void
  handleValidateClick: () => void
}

export { 
  ParamsInter,
  FilterInter,
  TableInter,
  ModalInter
}