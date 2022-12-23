/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { expect, test } from 'vitest'
import { FILE_PRE_HOST } from '@qcwp/common'
import { addHost } from '../string'

test('addHost test', () => {
  expect(addHost('a')).toBe(`${FILE_PRE_HOST}a`)
  expect(addHost('http://a')).toBe('http://a')
  expect(addHost('https://a')).toBe('https://a')
  expect(addHost(10000)).toBe('10000')
})

