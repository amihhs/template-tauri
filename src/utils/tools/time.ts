// https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
import type { ManipulateType } from 'dayjs/esm'
import dayjs from 'dayjs/esm'
import RelativeTime from 'dayjs/esm/plugin/relativeTime'
import UpdateLocale from 'dayjs/esm/plugin/updateLocale'
import 'dayjs/esm/locale/zh-cn.js' // import locale

/**
 * Y 年
 * M 月
 * D 日
 * H 时
 * m 分
 * s 秒
 */

dayjs.extend(RelativeTime) // use plugin
dayjs.extend(UpdateLocale) // use plugin
dayjs.locale('zh-cn')
dayjs.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1月',
    MM: '%d月',
    y: '1年',
    yy: '%d年',
  },
})

// 几天前
export function timeFrom(dateTime: number | string | null = null, format: string | false = 'YYYY-MM-DD') {
  const splitTime = 1000 * 3 * 24 * 60 * 60
  if (!dateTime)
    dateTime = dayjs().format('YYYY-MM-DD')
  if (!dayjs(dateTime).isValid())
    return dateTime.toString()
  if (dayjs().valueOf() - splitTime < dayjs(dateTime).valueOf() || format === false)
    return dayjs(dateTime).fromNow()
  // 相同年份时不显示年
  if (dayjs().year() === dayjs(dateTime).year())
    return timeFormat(dateTime, 'MM-DD')

  else
    return timeFormat(dateTime, format as string)
}

export function timeFormat(dateTime: number | string | null = null, fmt = 'YYYY-MM-DD') {
  if (!dateTime)
    return dayjs().format(fmt)
  if (!dayjs(dateTime).isValid())
    return dateTime.toString()
  return dayjs(dateTime).format(fmt) // '25/01/2019'
}

/**
 * 获取时间戳
 * @param dateTime 时间字符串
 * @param num 与当前传入时间的差值
 * @param type 在当前传入时间的基础上加（add)还是减（subtract）
 * @param unit 计算单位，时分秒，年月日...
 * @param fmt 格式化
 * @returns
 */
export function timeStamp(dateTime: number | string, num = 0, type: 'add' | 'subtract' = 'add', unit: ManipulateType = 'day', fmt?: string) {
  let time = dateTime ? dayjs(dateTime).valueOf() : dayjs().valueOf()

  if (num && type === 'add')
    time = dayjs(time).add(num, unit).valueOf()
  if (num && type === 'subtract')
    time = dayjs(time).subtract(num, unit).valueOf()

  if (fmt)
    return timeFormat(time, fmt)
  else
    return time
}

export function getCurrentTime(fmt = 'YYYY-MM-DD') {
  return dayjs().format(fmt)
}
