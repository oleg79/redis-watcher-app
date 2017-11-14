/** @flow */
import type { IDBDatabase } from './types/IDBDatabase'
import type { IDBOpenDBRequest } from './types/IDBOpenDBRequest'

const { indexedDB, console } = window // eslint-disable-line

const CONNECTIONS_TABLE = 'connections'

export default class Database {
  name: string
  version: number
  request:IDBOpenDBRequest
  db:IDBDatabase

  constructor (name:string, version:number) {
    this.name = name
    this.version = version

    this.request = indexedDB.open(this.name, this.version)

    this.request.onerror = (event:any) => {
      // TODO: provide error handling
    }

    this.request.onsuccess = ({ target }:Object) => {
      this.db = target.result
    }

    this.request.onupgradeneeded = ({ target }:Object) => {
      this.db = target.result

      if (!this.db.objectStoreNames.contains(CONNECTIONS_TABLE)) {
        const objectStore = this.db.createObjectStore(CONNECTIONS_TABLE, { // eslint-disable-line
          keyPath: 'id',
          autoIncrement: true
        })
      }
    }
  }

  getData:Function = () => {
    // TODO: get data
  }

  addData:Function = () => {
    // TODO: set data
  }
}
