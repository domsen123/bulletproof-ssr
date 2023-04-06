<template>
  <table class="v-table">
    <thead>
      <tr>
        <VTableHeader v-for="header in headers" :key="header.value" :header="header" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, row) in items" :key="row">
        <VTableCell v-for="header in headers" :key="header.value" :header="header" :item="item" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { AnyItem } from '@bulletproof/shared/*'
import type { PropType } from 'vue'
import type { DataTableHeader } from '~/components'
import { VTableCell, VTableHeader } from '~/components'

defineProps({
  headers: { type: Array as PropType<DataTableHeader[]>, required: true, default: () => [] },
  items: { type: Array as PropType<AnyItem[]>, default: () => [] },
})
</script>

<style>
.v-table { @apply w-full; }
.v-table > thead > tr > td { @apply font-medium italic uppercase;}
.v-table > tbody > tr > td { @apply text-sm;}
</style>
