export const ROUTES = {
    AUTH: 'auth',
    LOGIN: 'login',
    REGISTER: 'register',
    TASKS: 'tasks',
    STATS: 'stats',
    TOGGLE: 'toggle',
} as const

export type AuthMode = typeof ROUTES.LOGIN | typeof ROUTES.REGISTER

export const TOKEN = 'token'