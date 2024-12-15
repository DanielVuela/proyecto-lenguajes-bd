import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
// import type {} from '@redux-devtools/extension' // required for devtools typing


interface userState {
  token: string
  setToken: (newToken: string) => void
  userId: string
  setUserId: (newUserId: string) => void
}

const useUserStore = create<userState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (newToken) => set((_) => ({ token: newToken })),
        userId: "",
        setUserId: (newUserId) => set((_) => ({ userId: newUserId }))
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
)

export default useUserStore;