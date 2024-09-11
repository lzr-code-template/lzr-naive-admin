import CryptoJS from 'crypto-js'
// 引用AES源码js
const key = CryptoJS.enc.Utf8.parse('1234567812345678') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('1234567812345678') // 十六位十六进制数作为密钥偏移量

// 解密方法
export function Decrypt(word: string): string {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
export function Encrypt(word: string): string {
  const encrypted = CryptoJS.AES.encrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}
