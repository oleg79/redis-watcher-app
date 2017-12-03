/** @flow */

const createError = (code: string, data:Object) => ({
  type: 'error',
  code,
  data
})

const createInfo = (code: string, data:Object) => ({
  type: 'info',
  code,
  data
})

const createSuccess = (code: string, data:Object) => ({
  type: 'success',
  code,
  data
})

module.exports = {
  createError,
  createInfo,
  createSuccess
}
