import { HomePage } from './pages/HomePage';
import { Workspace } from './pages/Workspace';
import { LoginSignup } from './pages/LoginSignup';
import { BoardApp } from './pages/BoardApp';
import {
  TaskDetails
} from './pages/TaskDetails';

export const routes = [
  {
    path: '/board/:boardId/:groupIdId?/:taskId?',
    component: BoardApp,
  },
  {
    path: '/login',
    component: LoginSignup,
  },
  {
    path: '/signup',
    component: LoginSignup,
  },
  {
    path: '/workspace',
    component: Workspace,
  },
  {
    path: '/',
    component: HomePage,
  },
];
