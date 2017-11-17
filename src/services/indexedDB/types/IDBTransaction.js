/** @flow */
import type { IDBDatabase } from './IDBDatabase'
import type { IDBObjectStore } from './IDBObjectStore'

type Props = {
  db: IDBDatabase,
  error: any, // DOMException
  mode: any, // IDBTransactionMode
  objectStoreNames: Array<IDBObjectStore> // DOMStringList<IDBObjectStore>
}

type EventHandlers = {
  onabort?: Function,
  oncomplete?: Function,
  onerror?: Function
}

type Methods = {
  abort: Function,
  objectStore: any => IDBObjectStore
}

export type IDBTransaction = Props & EventHandlers & EventTarget & Methods
