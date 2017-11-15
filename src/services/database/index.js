/** @flow */
import type { IDBDatabase } from './types/IDBDatabase'
// import type { IDBOpenDBRequest } from './types/IDBOpenDBRequest'
import type { IDBTransaction } from './types/IDBTransaction'
import type { IDBObjectStore } from './types/IDBObjectStore'
import type { IDBRequest } from './types/IDBRequest'
// import type { IDBIndex } from './types/IDBIndex'

const { indexedDB, console } = window // eslint-disable-line

const CONNECTIONS_TABLE = 'connections'
const READ_WRITE = 'readwrite'
const READ_ONLY = 'readonly'
const HOST_PORT_INDEX = 'HostPortIndex'

type ConnectionFields = {
  host: string,
  port: number,
  protocol:? string,
  password:? string
}

export default class Database {
  request: Promise<IDBDatabase>

  constructor (name:string, version:number) {
    this.request = Database.connect(name, version)
  }

  static connect (name:string, version:number): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      let db
      const request = indexedDB.open(name, version)
      request.onupgradeneeded = ({ target }:Object) => {
        db = target.result

        if (!db.objectStoreNames.contains(CONNECTIONS_TABLE)) {
          const objectStore = db.createObjectStore(CONNECTIONS_TABLE, {
            keyPath: 'id',
            autoIncrement: true
          })

          objectStore.createIndex(HOST_PORT_INDEX, ['host', 'port'], { unique: true })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getConnectionsCount () {
    const database: IDBDatabase = await this.request

    const transaction: IDBTransaction = database.transaction([CONNECTIONS_TABLE], READ_ONLY)
    const objectStore: IDBObjectStore = transaction.objectStore(CONNECTIONS_TABLE)
    const countRequest: IDBRequest = objectStore.count()

    return new Promise((resolve, reject) => {
      countRequest.onsuccess = (event) => { resolve(event.target.result) }
      countRequest.onerror = () => { reject() }
    })
  }

  async addConnection (connection:ConnectionFields) {
    const database: IDBDatabase = await this.request

    const transaction: IDBTransaction = database.transaction([CONNECTIONS_TABLE], READ_WRITE)
    const objectStore: IDBObjectStore = transaction.objectStore(CONNECTIONS_TABLE)
    // const index: IDBIndex = objectStore.createIndex(HOST_PORT_INDEX)

    const addRequest:IDBRequest = objectStore.add(connection)

    return new Promise((resolve, reject) => {
      addRequest.onsuccess = (event) => { resolve(event.target.result) }
      addRequest.onerror = () => { reject() }
    })
  }
}
