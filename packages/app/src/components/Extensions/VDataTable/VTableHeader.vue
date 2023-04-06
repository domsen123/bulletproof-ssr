<template>
  <td class="v-table-header">
    <div class="v-table-header-inner">
      <div class="v-table-header-title" v-text="header.title" />
    </div>
  </td>
</template>

<script lang="ts" setup>
import type { DataTableHeader } from './types'

defineProps({
  header: { type: Object as PropType<DataTableHeader>, required: true, default: () => ({}) },
})
</script>

<style>
.v-table-header > .v-table-header-inner { @apply flex text-xs uppercase font-medium p-1; }
.v-table-header > .v-table-header-inner > .v-table-header-title { }
</style>
