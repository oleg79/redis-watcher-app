/** @flow */
const { localStorage } = window

export default class LocalStorage {
  static getItem (key:string):Object {
    const data = localStorage.getItem(key)
    return data
      ? JSON.parse(data)
      : {}
  }

  static setItem (key:string, value:Object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
