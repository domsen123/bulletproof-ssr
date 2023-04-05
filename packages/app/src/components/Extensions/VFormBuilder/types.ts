import type { Component } from 'vue'

type ValidationResult = string | boolean

export interface VFormBuilderInput extends Partial<HTMLInputElement> {
  label: string
  name: string
  defaultValue: any
  rules?: (
    | ValidationResult
    | PromiseLike<ValidationResult>
    | ((value: any) => ValidationResult)
    | ((value: any) => PromiseLike<ValidationResult>)
  )[]
  component: Component
}

export interface VFormBuilderData<T = any> {
  data: T
  valid: boolean
}
