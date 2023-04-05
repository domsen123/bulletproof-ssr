<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script lang="ts" setup>
import * as Layouts from '~/layouts'

const route = useRoute()

const layoutComponent = computed(() => {
  const layout = route.meta.layout ?? 'Default'
  const component = `${layout}Layout`
  // @ts-expect-error ...
  return Layouts[component]
},
)
</script>

<style lang="scss"></style>
