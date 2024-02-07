interface InfoInter {
  age: string
  bottomBingYin: string
  bottomGaiShu: string
  bottomGuoJiZhiLiao: string
  bottomGuoJiZhiLiaoHospital: string
  bottomRiChangHuLi: string
  bottomZhengZhuang: string
  dateStr: string
  departmentName: string
  departmentName1: string
  diseaseEngName: string
  diseaseName: string
  doctorName: string
  gender: string
  hospitalName: string
  id: string
  jobName: string
  name: string
  numId: string
  payNum: string
  payPrice: string
  payTime: string
  payWay: string
  stateName: string
  [key: string]: string
}

interface ReportInter {
  productActive: number
  productImgActive: number
  info: InfoInter
  changeProcuct: (index: number) => void
}

interface tabInter {
  name: string
  tab: string
}

interface tabsInter {
  active: string
  list: tabInter[]
  change: () => void
}

export { 
  ReportInter,
  tabsInter
}