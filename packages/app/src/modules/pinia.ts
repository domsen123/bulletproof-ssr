import { createPinia } from 'pinia'
import get from 'lodash/get'
import type { UserModule } from '@bulletproof/shared'

export const install: UserModule = async ({ app, initialState, isClient }) => {
  const pinia = createPinia()

  app.use(pinia)

  if (isClient)
    pinia.state.value = get(initialState, 'pinia', {})
  else
    initialState.pinia = pinia.state.value
}
