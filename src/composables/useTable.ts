
import api from '@/api/index'
import { pickBy } from 'lodash-es'

interface ParamsInter {  
  size: number
  currentPage: number
  [key: string]: any
}
interface TableInter {
  loading: boolean
  list: any[]
  getList: (more: boolean) => void
  pagination: any
  columns: any[]
  [key: string]: any
}

export function useTable(url: string, params: ParamsInter, columns: Array<any>, next: any = {}) {
  // 表格数据
  const table: TableInter = reactive({
    loading: true,
    list: [],
    getList: (more = true) => {
      if (!more) params.currentPage = table.pagination.page = 1
      api.get(url, pickBy(params, (value: ParamsInter) => {
        return typeof(value) === 'number' && value === 0 || Boolean(value)
      })).then((res) => {
        if (res.code === 200) {
          table.pagination.itemCount = res.data.total
          table.list = res.data.records || []
        } else {
          table.pagination.itemCount = 0
          table.list = []
        }
        nextTick(() => table.loading = false)
      })
    },
    pagination: {
      page: params.currentPage,
      pageSize: params.size,
      pageSizes: [
        { label: '5条', value: 5 },
        { label: '10条', value: 10 },
        { label: '15条', value: 15 },
        { label: '20条', value: 20 },
        { label: '50条', value: 50 }
      ],
      itemCount: 0,
      showSizePicker: true,
      showQuickJumper: true,
      displayOrder: ['size-picker', 'pages', 'quick-jumper'],
      prefix ({ itemCount }: { itemCount: number}) {
        return `共 ${itemCount} 条，每页`
      },
      onUpdatePage: (page: number) => {
        table.loading = true
        params.currentPage = table.pagination.page = page
        nextTick(() => table.getList(true))
      },
      onUpdatePageSize: (pageSize: number) => {
        table.loading = true
        params.size = table.pagination.pageSize = pageSize
        nextTick(() => table.getList(false))
      }
    },
    columns: columns,
    ...next
  })
  return {
    table
  }
}