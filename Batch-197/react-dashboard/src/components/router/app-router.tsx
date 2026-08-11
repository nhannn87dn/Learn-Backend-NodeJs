"use client"

import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes, type RouteConfig } from '@/config/routes'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

function renderRoutes(routeConfigs: RouteConfig[]) {
  return routeConfigs.map((route, index) => {
    const routeElement = route.protected ? (
      <ProtectedRoute>{route.element}</ProtectedRoute>
    ) : (
      route.element
    )

    return (
      <Route
        key={route.path + index}
        path={route.path}
        element={
          <Suspense fallback={<LoadingSpinner />}>
            {routeElement}
          </Suspense>
        }
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  })
}

export function AppRouter() {
  return (
    <Routes>
      {renderRoutes(routes)}
    </Routes>
  )
}
