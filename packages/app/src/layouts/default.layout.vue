<template>
  <VApp full-height>
    <VProgressLinear indeterminate />
    <VNavigationDrawer color="blue-grey-darken-4" floating>
      <VToolbar color="transparent" class="px-4">
        <VLogo class="text-xl" dark />
      </VToolbar>
      <div class="px-4">
      </div>
    </VNavigationDrawer>
    <VAppBar color="blue-grey-lighten-5">
      <template #append>
        <VBtn v-if="authService.isSignedIn().value" color="primary" icon @click="onSignOut">
          <div class="i-ph-sign-out" />
        </VBtn>
        <VBtn v-else color="primary" icon to="/auth">
          <div class="i-ph-sign-in" />
        </VBtn>
      </template>
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
    <CoreNotifier />
  </VApp>
</template>

<script lang="ts" setup>
import { getAuthService } from '~/locator'
import { CoreNotifier, VLogo } from '~/components'

const router = useRouter()
const authService = getAuthService()

const onSignOut = async () => {
  await authService.SignOut()
  router.push('/auth')
}
</script>

<style lang="scss"></style>
