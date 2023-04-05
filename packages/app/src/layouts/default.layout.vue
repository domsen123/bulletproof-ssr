<template>
  <VApp>
    <VMain>
      <slot />
    </VMain>
    <CoreNotifier />
  </VApp>
</template>

<script lang="ts" setup>
import { CoreNotifier } from '../components'
</script>

<style lang="scss"></style>
