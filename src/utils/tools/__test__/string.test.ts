/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expect, test } from 'vitest'
import { checkRouterPathRelative, queryString, queryUrl, trimStr } from '@qcwp/utils'

test('queryString test', () => {
  // @ts-expect-error
  expect(() => queryString()).toThrow(/queryString/)
  // @ts-expect-error
  expect(() => queryString(1)).toThrow(/queryString/)
  // @ts-expect-error
  expect(() => queryString({})).toThrow(/queryString/)

  expect(queryString('')).toEqual({})
  expect(queryString('/api/mock')).toEqual({})
  expect(queryString('/api/mock?code=200')).toEqual({ code: '200' })
  expect(queryString('/api/mock?code=200&type=list')).toEqual({ code: '200', type: 'list' })
  expect(queryString('/api/mock?code=200&code=201')).toEqual({ code: ['200', '201'] })
  expect(queryString('/api/mock?code=200&code=201&code=202')).toEqual({ code: ['200', '201', '202'] })
})

test('queryUrl test', () => {
  expect(queryUrl({})).toEqual('')
  expect(queryUrl({ a: '' })).toEqual('a=')
  expect(queryUrl({ a: 'b' })).toEqual('a=b')

  // The query string may optionally be prepended with a question mark:
  expect(queryUrl({ a: 'b' }, { addQueryPrefix: true })).toEqual('?a=b')

  // Properties that are set to undefined will be omitted entirely:
  expect(queryUrl({ a: undefined })).toEqual('')

  // null
  expect(queryUrl({ a: 'b', c: null })).toEqual('a=b')
  expect(queryUrl({ a: 'b', c: null }, { skipNulls: false })).toEqual('a=b&c=')
  expect(queryUrl({ c: null, a: 'b' }, { skipNulls: false, strictNullHandling: true })).toEqual('c&a=b')

  // array
  expect(queryUrl({ a: [1, 2, 3] }, { encode: false, indices: false })).toEqual('a=1&a=2&a=3')
  expect(queryUrl({ a: [1, 2, 3] }, { encode: false, indices: true })).toEqual('a[0]=1&a[1]=2&a[2]=3')
  expect(queryUrl({ a: [1, 2, 3] }, { encode: false, arrayFormat: 'indices' })).toEqual('a[0]=1&a[1]=2&a[2]=3')
  expect(queryUrl({ a: [1, 2, 3] }, { encode: false, arrayFormat: 'brackets' })).toEqual('a[]=1&a[]=2&a[]=3')
  expect(queryUrl({ a: [1, 2, 3] }, { encode: false, arrayFormat: 'repeat' })).toEqual('a=1&a=2&a=3')
  expect(queryUrl({ a: [1, 2, 3] }, { encode: false, arrayFormat: 'comma' })).toEqual('a=1,2,3')

  // other
  const a = Symbol('a')
  expect(queryUrl({ a: Infinity })).toEqual('a=Infinity')
  expect(queryUrl({ a }, { encode: false })).toEqual('a=Symbol(a)')
})

test('trimStr test', () => {
  expect(trimStr('aa')).toEqual('aa')
  expect(trimStr(' aa')).toEqual('aa')
  expect(trimStr('aa ')).toEqual('aa')
  expect(trimStr(' aa ')).toEqual('aa')
  expect(trimStr(' aa/n/t/t ')).toEqual('aa')
  expect(trimStr('/n /naa/n/t/t ')).toEqual('aa')
})
test('checkRouterPathRelative test', () => {
  expect(checkRouterPathRelative('/a', '/b')).toEqual(false)
  expect(checkRouterPathRelative('/a', '/a')).toEqual(true)
  expect(checkRouterPathRelative('/a', '/a/')).toEqual(true)
  expect(checkRouterPathRelative('/a', '/a/a')).toEqual(true)
  expect(checkRouterPathRelative('/a', '/a/a/c')).toEqual(true)
})
