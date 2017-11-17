/** @flow */
import type { IDBTransaction } from './IDBTransaction'
import type { IDBObjectStore } from './IDBObjectStore'
import type { IDBIndex } from './IDBIndex'

type Props = {
  error: any, // DOMException
  result: any,
  source: IDBIndex | IDBObjectStore | null,
  readyState: any, // IDBRequestReadyState
  transaction: IDBTransaction
}

type EventHandlers = {
  onerror?: Function,
  onsuccess?: Function
}

export type IDBRequest = Props & EventHandlers & EventTarget
