/** @flow */
import type { IDBObjectStore } from './IDBObjectStore'
import type { IDBRequest } from './IDBRequest'

type Props = {
  isAutoLocale: boolean,
  locale: string,
  name: string,
  objectStore: IDBObjectStore,
  keyPath: any,
  multiEntry: boolean,
  unique: boolean
}

type Methods = {
  count: () => IDBRequest,
  get: () => IDBRequest,
  getKey: () => IDBRequest,
  getAll: () => IDBRequest,
  getAllKeys: () => IDBRequest,
  openCursor: () => IDBRequest,
  openKeyCursor: () => IDBRequest
}

export type IDBIndex = Props & EventTarget & Methods
