import type { ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import type { AuthRole } from "@/stores/use-auth-store"

interface RoleGuardProps {
  allowedRoles: readonly AuthRole[]
  children: ReactNode
  fallback?: ReactNode
}

/** Renders its children only when the signed-in user has an allowed role. */
export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const { hasRoles } = useAuth()

  return hasRoles(allowedRoles) ? <>{children}</> : <>{fallback}</>
}
