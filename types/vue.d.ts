declare module 'vue/types/vue' {
  import * as Electron from 'electron'
  export interface Vue { $electron: Electron }
}
