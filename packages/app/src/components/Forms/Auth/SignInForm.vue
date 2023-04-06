<template>
  <VFormBuilder :inputs="formInputs" @submit="onSubmit">
    <template #submit>
      <div class="flex">
        <VBtn type="submit" color="primary">
          Anmelden
        </VBtn>
      </div>
    </template>
  </VFormBuilder>
</template>

<script lang="ts" setup>
import { VTextField } from 'vuetify/components'
import { getAuthService } from '~/locator'
import { VFormBuilder, rules } from '~/components'
import type { VFormBuilderData, VFormBuilderInput } from '~/components'

const props = defineProps({
  redirect: { type: String, default: () => '' },
})

const router = useRouter()

const formInputs = computed<VFormBuilderInput[] >(() => [
  { name: 'mail', label: 'Email', type: 'email', defaultValue: 'bullet@proof.com', component: VTextField, rules: [rules.required] },
  { name: 'password', label: 'Password', type: 'password', defaultValue: 'pass4word', component: VTextField, rules: [rules.required] },
])

const onSubmit = async (payload: VFormBuilderData) => {
  if (!payload.valid) return

  try {
    const service = getAuthService()
    await service.SignIn(payload.data.mail, payload.data.password)

    if (props.redirect) router.push(props.redirect)
  }
  catch (e: any) {
    console.error(e)
  }
}
</script>

<style lang="scss"></style>
