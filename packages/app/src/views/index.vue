<template>
  <VContainer fluid>
    <h1>CurrentUser</h1>
    <pre class="text-xs" v-text="store.getCurrentUser" />

    <h1>CurrentAuth</h1>
    <pre class="text-xs" v-text="store.getCurrentAuth" />
  </VContainer>
</template>

<script lang="ts" setup>
import { useAppStore } from '~/stores'

const store = useAppStore()
</script>

<style lang="scss"></style>
