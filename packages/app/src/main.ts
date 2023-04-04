import type { AppModule, EntryContext } from '@bulletproof/shared'
import { createSSRApp } from 'vue'
import { getAuthService, setApiService } from './locator'
import App from '~/App.vue'
import { createRouter } from '~/router'
import 'uno.css'

export const createApp = async (ssr: boolean, initialState: any, baseURL?: string, cookieString?: string) => {
  const app = createSSRApp(App)

  const router = createRouter(ssr)

  app.use(router)

  const ctx: EntryContext = {
    app,
    router,
    initialState,
    isClient: !ssr,
  }

  for (const { install } of Object.values(import.meta.glob<AppModule>('./modules/*.ts', { eager: true })))
    install(ctx)

  setApiService(!ssr, baseURL, cookieString)
  await getAuthService().AutoSignIn()

  return { app, router, initialState }
}
