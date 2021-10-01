import { HomePage } from './pages/HomePage';
import { Workspace } from './pages/Workspace';
import { LoginSignup } from './pages/LoginSignup';
import { BoardApp } from './pages/BoardApp';
import {
  TaskDetails
} from './pages/TaskDetails';

export const routes = [
  {
    path: '/board/:boardId',
    component: BoardApp,
  },
  // {
  //   path: '/board/:boardId/:taskId',
  //   render: TaskDetails,
  // },
  {
    path: '/login',
    component: LoginSignup,
  },
  {
    path: '/signup',
    component: TaskDetails,
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
