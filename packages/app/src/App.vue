<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script lang="ts" setup>
const route = useRoute()

const layoutComponent = computed(() => defineAsyncComponent(() => import(`~/layouts/${route.meta.layout ?? 'default'}.layout.vue`)))
</script>

<style lang="scss"></style>
