<template>
  <div class="flex flex-1 h-screen">
    <div class="flex flex-col flex-shrink-0 bg-white shadow p-20 max-w-500px w-full">
      <VLogo />
      <SignInForm class="my-auto" redirect="/" />
      <div class="text-sm text-gray-500">
        Version 1.0.0
      </div>
    </div>
    <div class="flex flex-1 bg-gray-100">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SignInForm, VLogo } from '~/components'
</script>
