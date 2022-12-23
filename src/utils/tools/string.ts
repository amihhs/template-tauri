import qs from 'qs'
import { isArray, isString } from '../is'

/**
 * 获url中的请求参数
 * @param url string
 * @returns Record<string, string | string[]> | TypeError
 */
export function queryString(url: string): Record<string, string | string[]> {
  if (!isString(url))
    throw new TypeError('Function queryString requires a string as an argument')
  if (!url.includes('?'))
    return {}
  const params = url.split('?').reverse()[0]
  const param = params.split('&')
  const query: Record<string, string | string[]> = {}

  for (const item of param) {
    const itemKeyValue = item.split('=')
    const key = itemKeyValue[0]
    const value = itemKeyValue[1] || ''
    if (Object.prototype.hasOwnProperty.call(query, key))
      query[key] = isArray(query[key]) ? [...query[key], value] : [query[key] as string, value]
    else
      query[key] = value
  }
  return query
}

/**
 * 将对象格式成url参数
 * @param query Record<string, any>
 * @param options qs options, see: https://www.npmjs.com/package/qs
 * @returns string
 */
export function queryUrl(query: Record<string, any>, options?: qs.IStringifyOptions) {
  return qs.stringify(query, { skipNulls: true, ...options })
}

// 清除字符串的空格和/n/t
export function trimStr(data: string) {
  return data.trim().replace(/\/n|\/t/g, '').trim()
}

// 判断两个路由是否是父子关系
// path: /a -> true: /a | /a/b | /a/    false: /ab
export function checkRouterPathRelative(parentPath: string, childPath: string) {
  if (parentPath === childPath)
    return true
  return !!childPath.match(new RegExp(`${parentPath}\/`))
}

export function addHttp(data: string, pre = 'http') {
  if (!isString(data)) {
    console.warn('addHttp param is not string:', data)
    return data
  }
  if (!data)
    return '/'
  if (data.match(/^http/))
    return data
  else
    return `${pre}://${data}`
}
