import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import type { UserModule } from '@bulletproof/shared'

export const install: UserModule = async ({ app }) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    defaults: {
      VBtn: {
        color: 'grey-lighten-4',
      },
      VTextField: {
        variant: 'outlined',
        bgColor: 'grey-lighten-4',
        singleLine: true,
      },
    },
  })
  app.use(vuetify)
}
