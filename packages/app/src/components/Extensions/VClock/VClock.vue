<template>
  <div class="v-clock" v-text="currentTime" />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

const currentTime = ref<string>(dayjs().locale('de').format('LLL'))

let interval: NodeJS.Timer | null = null
onMounted(() => {
  interval = setInterval(() => {
    currentTime.value = dayjs().format('LLL')
  }, 1000)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<style lang="scss"></style>
