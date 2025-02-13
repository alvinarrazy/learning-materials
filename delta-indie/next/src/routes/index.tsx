import { AppRoute } from './types';

export const protectedRoutes: AppRoute[] = [
  {
    path: '/',
    name: 'Home',
    icon: <i className='fe fe-home' />,
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: <i className='fe fe-user' />,
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    icon: <i className='fe fe-user' />,
    hidden: true,
  },
];
