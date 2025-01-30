export const AppRoutes = {
    root: '/',
    login: '/login',
    users: {
        base: '/users',
        children: ':id'
    },
    posts: {
        base: 'posts',
        children: ':id'
    },
};