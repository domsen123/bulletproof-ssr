<template>
  <div class="flex gap-2 items-center uppercase" :class="dark ? 'tex-white' : 'text-primary'">
    <div class="i-ph-shield-star-bold" />
    <div class="flex">
      <div class="font-bold">
        Bullet
      </div>
      <div class="font-light">
        Proof
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  dark: { type: Boolean, default: () => false },
})
</script>
