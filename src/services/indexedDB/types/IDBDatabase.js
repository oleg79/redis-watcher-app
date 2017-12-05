/** @flow */
import type { IDBObjectStore } from './IDBObjectStore'
import type { IDBTransaction } from './IDBTransaction'

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
  close: () => void,
  createObjectStore: (name:string, options?:Object) => IDBObjectStore,
  deleteObjectStore: (name:string) => void,
  transaction: (name:string|Array<string>, mode?:string) => IDBTransaction
}

export type IDBDatabase = Props & EventHandlers & EventTarget & Methods
