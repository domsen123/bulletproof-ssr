import type { UserModule } from '@bulletproof/shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

export const install: UserModule = async (_) => {
  dayjs.extend(localizedFormat)
}
