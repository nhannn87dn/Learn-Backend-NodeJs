//Auth Store with zustand
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'


interface IAuthUser {
    id: string
    name: string
    email: string
    role: string
}

export interface AuthState {
    user: IAuthUser | null
    accessToken: string | null
    refreshToken: string | null,
    setUser: (user: IAuthUser | null) => void
    setAccessToken: (token: string | null) => void
    setRefreshToken: (token: string | null) => void
    setAuth: (user: IAuthUser | null, accessToken: string | null, refreshToken: string | null) => void
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist((set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            setUser: (user) => set({ user }),
            setAccessToken: (token) => set({ accessToken: token }),
            setRefreshToken: (token) => set({ refreshToken: token }),
            setAuth: (user, accessToken, refreshToken) => set({ user, accessToken, refreshToken }),
        }), {
            name: 'auth-storage-bath-197', // unique name
            storage: createJSONStorage(() => localStorage),
        })
    )
)