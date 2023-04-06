import type { IncomingMessage, OutgoingMessage } from 'node:http'
import type { App } from 'vue'
import type { Router } from 'vue-router'

export type InitialState = Record<string, any>

export interface AppModule {
  install: UserModule
}

export type UserModule = (ctx: EntryContext) => void

export interface CreateApp {
  isClient: boolean
  initialState: InitialState
  baseURL?: string
  req?: IncomingMessage
  res?: OutgoingMessage
}

export interface EntryContext extends CreateApp {
  app: App
  router: Router
}

export interface RenderOptions {
  url: string
  manifest: Record<string, any>
  baseURL: string
  req: IncomingMessage
}

export interface RenderResult {
  innerHtml: string
  preloadedLinks: string
  initialState: InitialState
}
