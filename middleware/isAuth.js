export default function ({ app, redirect, route }) {
  const hasToken = !!app.$apolloHelpers.getToken();

  if (!hasToken) {
    const publicPaths = [
      '/login',
      '/login/',
      '/forgot-password',
      '/reset-password',
      '/register',
      '/validate-user'
    ];
    
    
    if (!publicPaths.includes(route.path)) {
      redirect('/login');
    }
  }
}