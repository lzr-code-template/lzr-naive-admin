// interface OrderInter {
//   discountmoneyhk: number | undefined
//   fahuotime: string
//   id: number | undefined
//   inserttime: string
//   moneyhk: number | undefined
//   moneyrmb: number | undefined
//   ordernum: string
//   paytime: string
//   payway: string
//   platform: string
//   proinfo: string
//   state: number | undefined
//   statetext: string
//   totalmoneyhk: number | undefined
//   totalmoneyrmb: number | undefined
//   userinfo: string,
//   shouhuotime: string
// }

// export { 
//   OrderInter
// }


interface ParamsInter {
  size: number
  currentPage: number
  name: string
  state: string
}

interface FilterInter {
  height: number
  data: {
    name: string
  }
  reset: () => void
  search: () => void
}

interface TabsInter {
  options: {
    label: string
    value: string
  }
}

export { 
  ParamsInter,
  FilterInter,
  TabsInter
}