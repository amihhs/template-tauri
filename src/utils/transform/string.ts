import { FILE_PRE_HOST } from '@qcwp/common'
import { isString } from '../is'
/**
 * 给相对路径资源添加域名
 * @param src string 图片地址
 * @returns string
 */
export function addHost(src: string) {
  if (src && typeof src == 'string' && !src.match(/http/) && !src.match(/^data:.*;base64.*/)) {
    src = FILE_PRE_HOST + src
    return src
  }
  return String(src)
}

/**
 * 移除文件资源路径前缀域名
 * @param src string
 * @returns string
 */
export function removeHost(src: string) {
  if (src && typeof src == 'string' && src.match(/http/) && !src.match(/^data:.*;base64.*/)) {
    src = src.replace(FILE_PRE_HOST, '')
    return src
  }
  return String(src)
}

// 替换未转码的转义字符
export function transferStr(str: string) {
  if (!str)
    return str
  const regexp = /&(.*?);/g
  const obj = {
    lt: '<',
    gt: '>',
    amp: '&',
    quot: '"',
    apos: '\'',
    semi: ';',
    nbsp: '\xA0',
    ensp: '\u2002',
    emsp: '\u2003',
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…',
  }
  const arr = Array.from(new Set(str.match(regexp)))
  arr.forEach((v) => {
    v.match(regexp)
    const i = RegExp.$1
    if (obj[i])
      str = str.replace(new RegExp(v, 'g'), obj[i])
  })
  str = str.replace(regexp, '')
  return str
}
/**
 * 移除字符串中的标签
 * @param str string
 * @returns string
 */
export function removeElementTags(str: string) {
  if (!str || !isString(str))
    return ''
  str = transferStr(str)
  const reg_1 = /\s*|\t|\r|\n/g
  const reg_2 = /<[^>]+>/g
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
  return str.replace(reg_1, '').replace(reg_2, '').replace(srcReg, '')
}

/**
 * 获取字符串中的图片
 * @param str
 * @returns string[]
 */
export function getStrImgs(str: string, isAddHost = false): string[] {
  if (!str)
    return []
  const imgReg = /<img.*?(?:>|\/>)/gi // 匹配图片中的img标签
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
  let imgList: string[] = str?.match(imgReg) ?? []
  imgList = imgList?.map((v) => {
    const src = v?.match(srcReg) ? v?.match(srcReg)?.[1] : ''
    return src?.match(/^data:.*;base64.*/)
      ? src
      : isAddHost ? addHost(src || '') : ''
  })

  return imgList.filter(v => v) ?? []
}
