export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard', '/sales/:path*', '/purchases/:path*', '/inventory', '/accounts/:path*', '/reports/:path*', '/settings', '/users', '/customers', '/suppliers'],
};