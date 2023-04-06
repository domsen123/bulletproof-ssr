<template>
  <VContainer fluid>
    <h1 class="font-bold text-2xl">
      Users
    </h1>
    <div class="breadcrumb flex items-center gap-1 text-xs">
      <RouterLink to="/" class="no-underline">
        Bullet Proof
      </RouterLink>
      <div class="i-ph-caret-right w-2" />
      <RouterLink to="/admin/users" class="no-underline">
        Admin
      </RouterLink>
      <div class="i-ph-caret-right w-2" />
      <div>Users</div>
    </div>
    <div class="mt-10">
      <VDataTable :headers="headers" :items="items" />
    </div>
  </VContainer>
</template>

<script lang="ts" setup>
import type { DataTableHeader } from '~/components'
import { VDataTable } from '~/components'

const headers: DataTableHeader[] = [
  { title: 'First Name', value: 'first_name' },
  { title: 'Last Name', value: 'last_name' },
  { title: 'E-Mail', value: 'mail' },
]

const items: Record<string, any>[] = [
  { first_name: 'Bullet', last_name: 'Proof', mail: 'bullet@proof.com' },
  { first_name: 'Bullet', last_name: 'Proof', mail: 'bullet@proof.com' },
  { first_name: 'Bullet', last_name: 'Proof', mail: 'bullet@proof.com' },
  { first_name: 'Bullet', last_name: 'Proof', mail: 'bullet@proof.com' },
  { first_name: 'Bullet', last_name: 'Proof', mail: 'bullet@proof.com' },
]
</script>

<style lang="scss"></style>
