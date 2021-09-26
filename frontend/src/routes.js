import { HomePage } from './pages/HomePage';
import { Workspace } from './pages/Workspace';
// import { LoginSignup } from './pages/LoginSignup'
import { BoardApp } from './pages/BoardApp';
import { DetailModal } from './cmps/Modal';

export const routes = [
  {
    path: '/board/:boardId',
    component: BoardApp,
  },
  {
    path: '/board/:boardId/:taskId',
    render: DetailModal,
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
    component: Workspace,
  },
  {
    path: '/',
    component: HomePage,
  },
];
