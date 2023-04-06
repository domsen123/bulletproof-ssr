<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script lang="ts" setup>
import { VApp } from 'vuetify/components'
import * as Layouts from '~/layouts'

const route = useRoute()

const layoutComponent = computed(() => {
  const layout = route.meta.layout ?? 'Default'
  const component = `${layout}Layout`
  // @ts-expect-error ...
  return component in Layouts ? Layouts[component] : VApp
})

onMounted(() => {
  // this is some hack to prevent vuetify flapping at hydration
  setTimeout(() => {
    document.getElementById('app')?.classList.remove('server-rendered')
  }, 450)
})
</script>

<style>
#app.server-rendered { @apply opacity-0; }
#app { @apply transition opacity-100; }
</style>
