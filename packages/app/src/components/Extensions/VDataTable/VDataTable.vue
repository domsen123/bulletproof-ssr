<template>
  <div class="v-data-table">
    <VTableActions :selection="selection" />

    <VTable :headers="headers" :items="items" />
  </div>
</template>

<script lang="ts" setup>
import type { AnyItem } from '@bulletproof/shared'
import type { DataTableHeader, DataTableSelection } from '~/components'
import { VTable, VTableActions } from '~/components'
defineProps({
  headers: { type: Array as PropType<DataTableHeader[]>, required: true, default: () => [] },
  items: { type: Array as PropType<AnyItem[]>, default: () => [] },
  selection: { type: String as PropType<DataTableSelection>, default: () => 'none' },
})
</script>

<style></style>
