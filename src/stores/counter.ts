import { defineStore } from 'pinia'

let localInfo = {};
if (localStorage.localInfo) {
  localInfo = JSON.parse(localStorage.localInfo)
}
export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    info: localInfo,
    website: {}
  }),
  actions: {
  }
})
