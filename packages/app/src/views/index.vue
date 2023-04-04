<template>
  <div>
    <h1>CurrentUser</h1>
    <pre class="text-xs" v-text="store.getCurrentUser" />

    <h1>CurrentAuth</h1>
    <pre class="text-xs" v-text="store.getCurrentAuth" />
  </div>
</template>

<script lang="ts" setup>
import { getApiService } from '../locator'

const service = getApiService()
const store = service.useStore()
</script>

<style lang="scss"></style>
