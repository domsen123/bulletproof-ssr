import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

export const createRouter = (ssr: boolean) => _createRouter({
  history: ssr ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/', component: () => import('~/views/index.vue') },
    { path: '/auth', component: () => import('~/views/auth/index.vue'), meta: { layout: 'blank', requiresAuth: false } },
  ],
})
