/** @flow */
import type { IDBRequest } from './IDBRequest'

type EventHandlers = {
  onblocked:? Function,
  onupgradeneeded:? Function
}

export type IDBOpenDBRequest = IDBRequest & EventTarget & EventHandlers
