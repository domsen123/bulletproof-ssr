import get from 'lodash/get'
import type { AppModule, CreateApp, EntryContext } from '@bulletproof/shared'
import { parseCookie } from '@bulletproof/shared'
import { createSSRApp } from 'vue'
import { AuthService } from './services'
import { setApiService } from '~/locator'
import { createRouter } from '~/router'
import App from '~/App.vue'
import 'uno.css'

export const createApp = async (options: CreateApp) => {
  const { isClient, initialState, req } = options

  const app = createSSRApp(App)

  const router = createRouter(isClient)

  app.use(router)

  const ctx: EntryContext = {
    app,
    router,
    ...options,
  }

  for (const { install } of Object.values(import.meta.glob<AppModule>('./modules/*.ts', { eager: true })))
    install(ctx)

  let access_token = req ? get(req, 'headers.cookie', '') : ''
  if (access_token)
    access_token = parseCookie(access_token, 'access_token')

  setApiService(ctx)
  await AuthService.AutoSignIn(ctx, access_token)

  return { app, router, initialState }
}
