/** @flow */
type Props = {
  name: string,
  version: number,
  objectStoreNames: Array<string> // DOMStringList
}

type EventHandlers = {
  onabort?: Function,
  onclose?: Function,
  onerror?: Function,
  onversionchange?: Function
}

type Methods = {
  close: Function,
  createObjectStore: Function,
  deleteObjectStore: Function,
  transaction: Function
}

export type IDBDatabase = Props & EventHandlers & Methods
