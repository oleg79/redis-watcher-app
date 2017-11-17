/** @flow */
const { localStorage } = window

export default class LocalStorage {
  static getItem (key:string):Object {
    return JSON.parse(localStorage.getItem(key))
  }

  static setItem (key:string, value:Object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
