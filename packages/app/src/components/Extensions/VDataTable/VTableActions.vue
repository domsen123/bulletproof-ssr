<template>
  <div class="v-table-actions">
    <VBtn variant="tonal" color="primary" size="small" :rounded="false">
      New Item
    </VBtn>
    <VBtn v-if="selection !== 'none'" variant="tonal" color="info" size="small">
      Update Item
    </VBtn>
    <VBtn v-if="selection !== 'none'" variant="tonal" color="error" size="small">
      Delete Item
    </VBtn>
    <div class="ml-auto min-w-60">
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DataTableSelection } from './types'

defineProps({
  selection: { type: String as PropType<DataTableSelection> },
})
</script>

<style>
.v-table-actions { @apply bg-gray-100 p-2 rounded flex items-center gap-1 mb-3; }
</style>
