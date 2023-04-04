import { createApp } from './main'

const initialState = window.__INITIAL_STATE__

const { app, router } = await createApp(false, initialState)

router.isReady().then(() => {
  app.mount('#app')
})
