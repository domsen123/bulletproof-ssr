import crypto from 'node:crypto'

export const encryptString = async (v: string): Promise<string> => {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = crypto.scryptSync(v, salt, 64)
  return `${salt}:${derivedKey.toString('hex')}`
}

export const verifyString = async (v: string, hash: string) => {
  const [salt, key] = hash.split(':') as [string, string]
  const keyBuffer = Buffer.from(key, 'hex')
  const derivedKey = crypto.scryptSync(v, salt, 64)
  return crypto.timingSafeEqual(derivedKey, keyBuffer)
}
