//custom hook useAuth.ts

import axiosClient from "@/lib/axiosClient"
import { useAuthStore } from "@/stores/use-auth-store"
import type { AuthRole } from "@/stores/use-auth-store"

export const useAuth = () => {
    const { user, accessToken, refreshToken, setAuth } = useAuthStore()

    const login = async(email: string, password: string) => {
        try {
            const response = await axiosClient.post('/v1/auth/login', {
                email,
                password,
            })

            const payload = response?.data?.data ?? response?.data
            const authUser = payload?.user ?? null
            const authAccessToken = payload?.accessToken ?? null
            const authRefreshToken = payload?.refreshToken ?? null

            if (response.status >= 200 && response.status < 300 && authAccessToken && authRefreshToken) {
                setAuth(authUser, authAccessToken, authRefreshToken)
                return { success: true, user: authUser, accessToken: authAccessToken, refreshToken: authRefreshToken }
            }

            return { success: false, message: 'Login failed' }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, message: 'Login failed' }
        }
    }

    const logout = () => {
        setAuth(null, null, null)
    }
    const hasRoles = (roles: readonly AuthRole[], mode: 'some' | 'every' = 'some') => {
        if (!user || !user.role) return false
        const userRoles = [user.role]
        return userRoles[mode]((role) => roles.includes(role))
    }

    return {
        user,
        isAuthenticated: !!user && !!accessToken && !!refreshToken,
        accessToken,
        refreshToken,
        login,
        logout,
        hasRoles
    }
}
