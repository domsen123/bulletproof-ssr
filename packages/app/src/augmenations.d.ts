export {}

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    requiresAuth: boolean
  }
}