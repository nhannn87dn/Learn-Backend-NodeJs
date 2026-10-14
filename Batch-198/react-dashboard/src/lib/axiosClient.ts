import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from 'axios'

import { useAuthStore } from '@/stores/use-auth-store'
import { ENV } from '@/config/env'

const API_URL = ENV.API_URL

/**
 * Extend AxiosRequestConfig to prevent
 * infinite retry loop when refreshing token.
 */
interface RetryAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean
}

/**
 * Axios instance used by application APIs.
 */
const axiosClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30_000,
})

/**
 * -------------------------------------------------------
 * Request Interceptor
 * -------------------------------------------------------
 *
 * Automatically attach accessToken to Authorization header.
 */
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Lấy accessToken từ Zustand store
        const { accessToken } = useAuthStore.getState()

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

/**
 * -------------------------------------------------------
 * Response Interceptor
 * -------------------------------------------------------
 *
 * When API returns 401:
 *
 * 1. Get refreshToken from AuthStore
 * 2. Call /auth/refresh
 * 3. Save new accessToken
 * 4. Retry original request
 */
axiosClient.interceptors.response.use(
    (response) => {
        return response
    },

    async (error: AxiosError) => {
        const originalRequest =
            error.config as RetryAxiosRequestConfig | undefined

        /**
         * If there is no original request,
         * simply reject the error.
         */
        if (!originalRequest) {
            return Promise.reject(error)
        }

        /**
         * Only handle HTTP 401 Unauthorized.
         */
        if (error.response?.status !== 401) {
            return Promise.reject(error)
        }

        /**
         * Prevent infinite refresh loop.
         */
        if (originalRequest._retry) {
            return Promise.reject(error)
        }

        /**
         * Do not intercept the refresh request itself.
         */
        if (originalRequest.url?.includes('/v1/auth/refresh')) {
            return Promise.reject(error)
        }

        originalRequest._retry = true

        const { refreshToken } = useAuthStore.getState()

        /**
         * No refresh token -> user must login again.
         */
        if (!refreshToken) {
            useAuthStore.getState().setAuth(null, null, null)

            return Promise.reject(error)
        }

        try {
            /**
             * IMPORTANT:
             * Use axios directly instead of axiosClient here.
             *
             * Otherwise this request can also go through
             * the response interceptor and cause a loop.
             */
            const response = await axios.post(
                `${API_URL}/v1/auth/refresh`,
                {
                    refreshToken,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )

            /**
             * Adjust these fields according to
             * your backend response structure.
             *
             * Example:
             *
             * {
             *     data: {
             *         accessToken: '...'
             *     }
             * }
             */
            const payload = response?.data?.data ?? response?.data
            const newAccessToken = payload?.accessToken ?? payload?.token ?? null

            if (!newAccessToken) {
                useAuthStore.getState().setAuth(null, null, null)
                return Promise.reject(new Error('Invalid refresh response'))
            }

            /**
             * Save new accessToken to Zustand.
             */
            useAuthStore
                .getState()
                .setAccessToken(newAccessToken)

            /**
             * Attach new token to original request.
             */
            originalRequest.headers = originalRequest.headers ?? {}

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`

            /**
             * Retry original request.
             */
            return axiosClient(originalRequest)
        } catch (refreshError) {
            /**
             * Refresh token is invalid/expired.
             * Clear authentication state.
             */
            useAuthStore.getState().setAuth(null, null, null)

            return Promise.reject(refreshError)
        }
    },
)

export default axiosClient

