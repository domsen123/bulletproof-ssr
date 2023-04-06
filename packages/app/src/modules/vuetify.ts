import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import type { UserModule } from '@bulletproof/shared'
import { md1 } from 'vuetify/blueprints'

export const install: UserModule = async ({ app }) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md1,
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
