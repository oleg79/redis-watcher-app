/** @flow */
import type { IDBTransaction } from './IDBTransaction'
import type { IDBIndexParameters } from './IDBIndexParameters'
import type { IDBRequest } from './IDBRequest'
import type { IDBIndex } from './IDBIndex'

type Props = {
  indexNames: Array<string>, // DOMStringList
  keyPath:? any,
  name: string,
  transaction: IDBTransaction,
  autoIncrement: boolean
}

type Methods = {
  add: (any, ?any) => IDBRequest,
  clear: () => IDBRequest,
  count: () => IDBRequest,
  createIndex: (string, ?any, ?IDBIndexParameters) => IDBIndex,
  delete: () => IDBRequest,
  deleteIndex: Function,
  get: () => IDBRequest,
  getKey: () => IDBRequest,
  getAll: () => IDBRequest,
  getAllKeys: () => IDBRequest,
  index: Function,
  openCursor: () => IDBRequest,
  openKeyCursor: () => IDBRequest,
  put: (any, ?any) => IDBRequest
}

export type IDBObjectStore = Props & Methods
