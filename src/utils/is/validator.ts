import { isNumber, isString } from '.'

export const phoneRegExp = /^1[3-9]\d{9}$/
/**
 * 中文正则
 */
export const chineseRegExp = /[^\u4E00-\u9FA5]/

/**
 * 是否等于空值
 * @param value [null, undefined, 'null', 'undefined', '']
 * @param includeEmptyString 是否保存空字符串
 * @returns boolean
 */
export function isEqualEmpty(value: any, includeEmptyString = true) {
  const normalEmpty = [null, undefined, 'null', 'undefined']
  const empties = includeEmptyString
    ? [...normalEmpty, '']
    : normalEmpty

  return empties.includes(value)
}

/**
 * 校验是否包含中文
 * @param data string | number
 * @returns boolean
 */
export const validatorChinese = (data: string | number) => {
  if (!['string', 'number'].includes(typeof data))
    throw new Error('validatorChinese error: data is not string or number')
  if (isNumber(data))
    data = String(data)
  return isString(data) && !!data.match(new RegExp(chineseRegExp, 'g'))
}

/**
 * 校验是否是手机号
 * @param phone
 * @returns
 */
export const validatorPhone = (phone: string) => {
  if (!isString(phone))
    phone = String(phone)
  return phoneRegExp.test(phone)
}
/**
 * 校验邮箱是否正确
 * @param email
 * @returns
 */
export const validatorEmail = (email: unknown) => {
  return typeof email === 'string' && !!email.match(/^\S+?@\S+?\.\S+?$/) && email.length < 255
}

