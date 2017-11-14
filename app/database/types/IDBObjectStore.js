/** @flow */
import type { IDBTransaction } from './IDBTransaction'
import type { IDBRequest } from './IDBRequest'

type Props = {
  indexNames: Array<string>, // DOMStringList
  keyPath:? any,
  name: string,
  transaction: IDBTransaction,
  autoIncrement: boolean
}

type Methods = {
  add: () => IDBRequest,
  clear: () => IDBRequest,
  count: () => IDBRequest,
  createIndex: () => any,
  delete: () => IDBRequest,
  deleteIndex: Function,
  get: () => IDBRequest,
  getKey: () => IDBRequest,
  getAll: () => IDBRequest,
  getAllKeys: () => IDBRequest,
  index: Function,
  openCursor: () => IDBRequest,
  openKeyCursor: () => IDBRequest,
  put: () => IDBRequest
}

export type IDBObjectStore = Props & Methods
