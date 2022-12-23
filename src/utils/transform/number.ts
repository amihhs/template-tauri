/**
   * 数字格式化
   */
const enUnit = 'W'
const zhUnit = '万'
export const numFormat = (num: number, point = 1, isE = false) => {
  if (!num)
    return '0'
  if (isNaN(num) || isNaN((Number(num))))
    return num

  // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
  const numStr = num.toString().split('.')[0]
  if (numStr.length < 5) { // 判断数字有多长,如果小于一万,让其直接显示
    return numStr
  }

  else if (numStr.length >= 5 && numStr.length <= 8) { // 如果数字大于6位,小于8位,让其数字后面加单位万
    const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
    // 由千位,百位组成的一个数字
    return parseFloat(`${parseInt((num / 10000).toString())}.${decimal}`) + (isE ? enUnit : zhUnit)
  }
  else if (numStr.length > 8) { // 如果数字大于8位,让其数字后面加单位亿
    const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
    return `${parseFloat(`${parseInt((num / 100000000).toString())}.${decimal}`)}亿`
  }
}
export const toChinesNum = (num: number) => {
  if (!num || isNaN(parseInt(num.toString())))
    return num
  const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['', '十', '百', '千', '万']
  num = parseInt(num.toString())

  const getWan = (temp: any) => {
    const strArr = temp.toString().split('').reverse()
    let newNum = ''
    for (let i = 0; i < strArr.length; i++)
      // eslint-disable-next-line eqeqeq
      newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum

    return newNum
  }
  const overWan = Math.floor(num / 10000)
  let noWan: number | string = num % 10000
  if (noWan.toString().length < 4)
    noWan = `0${noWan}`
  return overWan ? `${getWan(overWan)}万${getWan(noWan)}` : getWan(num)
}

