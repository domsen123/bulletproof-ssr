import { createApp } from './main'

const initialState = window.__INITIAL_STATE__

const baseURL = import.meta.env.DEV ? 'http://localhost:8055' : undefined

const { app, router } = await createApp(false, initialState, baseURL)

router.isReady().then(() => {
  app.mount('#app')
})
