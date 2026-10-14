import type { ReactNode } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
    children?: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    /**
     * User is not authenticated
     * -> redirect to login page
     *
     * Save current location so we can redirect
     * back after successful login.
     */
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/auth/sign-in"
                replace
                state={{ from: location }}
            />
        )
    }

    /**
     * User is authenticated
     * -> render child route
     */
    return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute

