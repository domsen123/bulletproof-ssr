<template>
  <VApp full-height>
    <VProgressLinear indeterminate />
    <VNavigationDrawer color="blue-grey-darken-4" theme="dark" floating>
      <VToolbar color="transparent" class="px-4">
        <VLogo class="text-xl" dark />
      </VToolbar>
      <VList nav density="compact" :lines="false">
        <VListSubheader class="uppercase text-xs font-black tracking-tighter" title="Admin" />
        <VListItem to="/admin/users" variant="text" rounded title="Users" />
        <VListItem to="/admin/roles" variant="text" rounded title="Roles" />
      </VList>
    </VNavigationDrawer>
    <VAppBar color="blue-grey-lighten-5">
      <template #append>
        <VDivider vertical color="blue-grey-darken-1" />
        <VClock class="text-sm px-8 text-blue-grey-darken-1" />
        <VDivider vertical color="blue-grey-darken-1" />
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
import { CoreNotifier, VClock, VLogo } from '~/components'

const router = useRouter()
const authService = getAuthService()

const onSignOut = async () => {
  await authService.SignOut()
  router.push('/auth')
}
</script>

<style lang="scss"></style>
