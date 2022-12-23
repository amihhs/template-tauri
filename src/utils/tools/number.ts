import { isNumber } from '../is'

/**
 * 返回一个中间大小的数
 * @param n
 * @param min
 * @param max
 * @returns
 */
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
export const min = (data: number[]) => data.sort((a, b) => a - b)[0]
export const max = (data: number[]) => data.sort((a, b) => a - b)[0]

/**
  * 给定一个范围生成在改范围内的整数
  * @param min
  * @param max
  * @returns
  */
export const rand = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function formatNumber(data: unknown, defaultNumber = 0) {
  if (isNumber(data))
    return data
  else if (!isNaN(Number(data)))
    return Number(data)
  else
    return defaultNumber
}
