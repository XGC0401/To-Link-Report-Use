export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/') {
        return
    }

    if (!process.client) {
        return
    }

    const token = localStorage.getItem('token') || localStorage.getItem('userToken')
    const hasToken = Boolean(token && token !== 'null' && token !== 'undefined')
    const isValidJwt = hasToken && token!.split('.').length === 3

    if (!isValidJwt) {
        localStorage.removeItem('token')
        localStorage.removeItem('userToken')
        return navigateTo('/')
    }
})
