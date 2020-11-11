import { createPlugin, createRouteRef } from '@backstage/core';
import AccountPage from './components/AccountPage';

export const rootRouteRef = createRouteRef({
  path: '/money',
  title: 'money',
});

export const plugin = createPlugin({
  id: 'money',
  register({ router }) {
    router.addRoute(rootRouteRef, AccountPage);
  },
});
