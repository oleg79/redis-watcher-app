const createError = (code, data) => ({
  type: 'error',
  code,
  data
})

const createInfo = (code, data) => ({
  type: 'info',
  code,
  data
})

const createSuccess = (code, data) => ({
  type: 'success',
  code,
  data
})

module.exports = {
  createError,
  createInfo,
  createSuccess
}
