import { expect, test } from 'vitest'
import { isEqualEmpty } from '@qcwp/utils'

test('isEqualEmpty', () => {
  expect(isEqualEmpty(null)).toEqual(true)
  expect(isEqualEmpty('null')).toEqual(true)
  expect(isEqualEmpty(undefined)).toEqual(true)
  expect(isEqualEmpty('undefined')).toEqual(true)
  expect(isEqualEmpty('')).toEqual(true)
  expect(isEqualEmpty('', false)).toEqual(false)
  expect(isEqualEmpty('1')).toEqual(false)
  expect(isEqualEmpty(1)).toEqual(false)
})
