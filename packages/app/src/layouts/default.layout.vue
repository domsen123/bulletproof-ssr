<template>
  <VApp>
    <VNavigationDrawer color="blue-grey-darken-4" floating>
      <VToolbar color="transparent" class="px-4">
        <VLogo class="text-xl" dark />
      </VToolbar>
      <div class="px-4">
      </div>
    </VNavigationDrawer>
    <VAppBar color="blue-grey-lighten-5">
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
    <CoreNotifier />
  </VApp>
</template>

<script lang="ts" setup>
import { CoreNotifier, VLogo } from '~/components'
</script>

<style lang="scss"></style>
