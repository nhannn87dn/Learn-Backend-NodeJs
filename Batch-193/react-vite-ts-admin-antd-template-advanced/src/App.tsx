import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import { routes, type RouteItem } from './routes';
import NotFoundPage from './modules/notfound/NotFoundPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
// import UserListPage from './modules/administrator/pages/UserListPage';
// import ProtectedRouteSimple from './modules/auth/components/ProtectedRouteSimple';

// Create a client
const queryClient = new QueryClient()

// Đệ quy sinh route từ mảng routes, bọc element bằng ProtectedRoute
function renderRoutes(routes: RouteItem[], parentIsPrivate = false) {
  return routes.map((route) => {
    let Layout = route.layout !== undefined ? route.layout : DashboardLayout;
    if (route.isPrivate || parentIsPrivate) {
      Layout = DashboardLayout;
    }
    // Nếu có children
    if (route.children && route.children.length > 0) {
      return (
        <Route key={route.key} path={route.path} element={<Layout />}>
          {/* Nếu có element ở cha, render ở index */}
          {route.element && (
            <Route index element={
              <ProtectedRoute route={route}>
                {route.element}
              </ProtectedRoute>
            } />
          )}
          {/* Các route con không bọc lại Layout */}
          {route.children.map(child =>
            child.children && child.children.length > 0
              ? renderRoutes([child], route.isPrivate || parentIsPrivate)
              : <Route key={child.key} path={child.path} element={
                  <ProtectedRoute route={child}>
                    {child.element || <div>{child.label} Page</div>}
                  </ProtectedRoute>
                } />
          )}
        </Route>
      );
    }
    // Route không có children, vẫn bọc Layout phù hợp
    return (
      <Route key={route.key} path={route.path} element={<Layout />}>
        {route.element && (
          <Route index element={
            <ProtectedRoute route={route}>
              {route.element}
            </ProtectedRoute>
          } />
        )}
      </Route>
    );
  });
}

function App() {
  // get user from useAuthStore
  /*
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    roles: ['admin', 'user'],
    permissions: ['dashboard.view', 'product.view', 'administrators.view', 'roles.view', 'users.view'],
  }

  */
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        {renderRoutes(routes)}
        <Route path="*" element={<NotFoundPage />} />
         {/* <Route path="/users" element={<ProtectedRouteSimple roles={['admin']}><UserListPage /></ProtectedRouteSimple>} /> */}
      </Routes>
    </BrowserRouter>
     {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
