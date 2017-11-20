/** @flow */
export const sanitizeOptionsObject = (options:Object): Object =>
  Object
    .entries(options)
    .filter(([_, value]) => value !== null)
    .reduce((acc, [key, val]) => {
      acc[key] = val
      return acc
    }, Object.create(null))

export const sanitizeArray = () => {}
