<template>
  <td class="v-table-cell">
    <div class="v-table-inner" v-text="item[header.value]" />
  </td>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { AnyItem } from '@bulletproof/shared/*'
import type { DataTableHeader } from './types'

defineProps({
  header: { type: Object as PropType<DataTableHeader>, required: true, default: () => ({}) },
  item: { type: Object as PropType<AnyItem>, default: () => ({}) },
})
</script>

<style>
.v-table-cell > .v-table-inner { @apply flex p-1; }
</style>
