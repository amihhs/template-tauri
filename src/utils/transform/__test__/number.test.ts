/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { expect, test } from 'vitest'
import { numFormat, toChinesNum } from '../number'

test('numFormat test', () => {
  expect(numFormat(10)).toBe('10')
  expect(numFormat(1000)).toBe('1000')
  expect(numFormat(10000)).toBe('1万')
  expect(numFormat(222222)).toBe('22.2万')
  expect(numFormat(undefined)).toBe('0')
  expect(numFormat('11万')).toBe('11万')
  expect(numFormat('a')).toBe('a')
  expect(numFormat('1')).toBe('1')
})

test('toChinesNum test', () => {
  expect(toChinesNum(1)).toBe('一')
  expect(toChinesNum(100)).toBe('一百')
  expect(toChinesNum(1000)).toBe('一千')
  expect(toChinesNum(10000)).toBe('一万')
  expect(toChinesNum(11150)).toBe('一万一千一百五十')
})
