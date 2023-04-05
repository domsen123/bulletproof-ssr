<template>
  <div v-if="hasNotifications" class="core-notification-container">
    <div v-for="(notification, index) in activeNotifications" :key="notification.timestamp" class="core-notification-item">
      <VCard>
        <VToolbar :color="notification.type" density="compact">
          <VToolbarTitle v-if="notification.type === 'error'" v-text="'Error'" />
          <VSpacer />
          <VBtn size="small" icon @click="() => dismissNotification(index)">
            <div class="i-ph-x" />
          </VBtn>
        </VToolbar>
        <VCardText>
          {{ notification.message }}
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AppNotification } from '@bulletproof/shared/*'
import { useAppStore } from '~/stores'

type IAppNotification = AppNotification & { dismissed: boolean }

const store = useAppStore()

const notifications = ref<IAppNotification[]>([])
const activeNotifications = computed(() => notifications.value.filter(n => !n.dismissed))
const hasNotifications = computed(() => activeNotifications.value.length)

const dismissNotification = (index: number) => {
  notifications.value[index].dismissed = true
}

watch(store.notifications, (notificationList) => {
  for (const n of notificationList) {
    const index = notifications.value.findIndex(item => item.timestamp === n.timestamp)
    if (index === -1) {
      notifications.value.push({ ...n, dismissed: false })
      setTimeout(() => {
        const newIndex = notifications.value.findIndex(item => item.timestamp === n.timestamp)
        dismissNotification(newIndex)
      }, 5000)
    }
  }
})
</script>

<style>
.core-notification-container{
  @apply fixed right-5 top-5 w-80;
}
</style>
