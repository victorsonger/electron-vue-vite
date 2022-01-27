import { defineStore } from 'pinia';
import store from '..'

interface User {
  id: string
  name: string
  age: number
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): User => ({
    id: '1',
    name: '张三',
    age: 23,
  }),
  getters: {
    getUser(): User {
      return this
    },
  },
  actions: {
    setUser(user: Partial<User>) {
      if (user.id) this.id = user.id
      if (user.name) this.name = user.name
      if (user.age) this.age = user.age
    },
    resetState() {
      this.id = '1'
      this.name = '张三'
      this.age = 23
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
