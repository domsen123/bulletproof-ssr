import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

export const createRouter = (isClient: boolean) => _createRouter({
  history: isClient ? createWebHistory() : createMemoryHistory(),
  routes: [
    { path: '/', component: () => import('~/views/index.vue') },
    { path: '/auth', component: () => import('~/views/auth/index.vue'), meta: { layout: 'Blank', requiresAuth: false } },
    { path: '/admin/users', component: () => import('~/views/admin/users/index.vue') },
    { path: '/admin/roles', component: () => import('~/views/admin/roles/index.vue') },
  ],
})
