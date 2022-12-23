export function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
/**
 *  通过对象的值来获取对象的key
 * @param object Record<string, T>
 * @param value  T
 * @returns string
 */
export function getObjectKey<T = string>(object: Record<string, T>, value: T) {
  return Object.keys(object).find(key => object[key] === value)
}
export * from './string'
export * from './time'
export * from './number'
