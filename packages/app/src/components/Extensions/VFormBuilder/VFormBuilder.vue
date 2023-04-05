<template>
  <VForm ref="vFormEl" @submit.prevent="onFormSubmit">
    <slot :payload="payload">
      <component v-bind="input" :is="input.component" v-for="(input, index) in inputs" :key="input.name" v-model="payload[input.name]" :autofocus="index === 0" />
    </slot>

    <slot name="submit">
      <div class="flex gap-2 justify-end">
        <VBtn>Abbrechen</VBtn>
        <VBtn type="submit" color="primary">
          Speichern
        </VBtn>
      </div>
    </slot>

    <pre v-if="debug" class="text-xs bg-gray-100 p-2 rounded border border-gray-300 mt-3" v-text="payload" />
  </VForm>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { VForm } from 'vuetify/components'
import type { VFormBuilderInput } from '~/components'

const props = defineProps({
  modelValue: { type: Object as PropType<any>, default: () => ({}) },
  inputs: { type: Array as PropType<VFormBuilderInput[]>, default: () => [] },
  debug: { type: Boolean, default: () => false },
})

const emits = defineEmits(['submit'])
const payload = ref<Record<string, any>>(
  Object.assign({}, ...props.inputs.map(input => ({ [input.name]: props.modelValue[input.name] ?? input.defaultValue }))),
)
const vFormEl = ref<any>()
const onFormSubmit = async (e: Event) => {
  e.preventDefault()

  const { valid } = await vFormEl.value.validate()
  emits('submit', { data: payload.value, valid })
}
</script>

<style lang="scss"></style>
