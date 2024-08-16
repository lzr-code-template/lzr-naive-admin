interface LoginInter {
  loginType: boolean
  captcha: string
  phone: string
  password: string
}

interface UserInter {
  gender: string
  id: number
  inserttime: string
  mobile: string
  name: string
  password: string
  roleid: number
  state: number
}

export {
  LoginInter,
  UserInter,
}
