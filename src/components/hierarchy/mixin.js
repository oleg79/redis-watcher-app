/** @flow */

export default {
  filters: {
    safeKey (val:any, replacement:string) {
      return undefined === val ? replacement : val
    }
  },
}
