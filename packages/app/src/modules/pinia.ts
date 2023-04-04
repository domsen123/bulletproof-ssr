import { createPinia } from 'pinia'
import type { UserModule } from '@bulletproof/shared'

export const install: UserModule = async ({ app, initialState, isClient }) => {
  const pinia = createPinia()

  app.use(pinia)

  if (isClient)
    pinia.state.value = (initialState.pinia) || {}
  else
    initialState.pinia = pinia.state.value
}
