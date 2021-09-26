import { HomePage } from './pages/HomePage'
import { WorkSpace } from './pages/WorkSpace'
// import { LoginSignup } from './pages/LoginSignup'
import { BoardApp } from './pages/BoardApp'

export const routes = [
    {
        path: '/board/:boardId',
        component: BoardApp,
    },
    // {
    //     path: '/login',
    //     component: LoginSignup,
    // },
    // {
    //     path: '/signup',
    //     component: LoginSignup,
    // },
    {
        path: '/workspace',
        component: WorkSpace,
    },
    {
        path: '/',
        component: HomePage,
    }
]