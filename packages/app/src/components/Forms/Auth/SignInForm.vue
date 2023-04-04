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
import { getApiService } from '~/locator'
import { VFormBuilder, rules } from '~/components'
import type { VFormBuilderData, VFormBuilderInput } from '~/components'

const props = defineProps({
  redirect: { type: String, default: () => '' },
})

const router = useRouter()

const formInputs: VFormBuilderInput[] = [
  { name: 'mail', label: 'Email', type: 'email', defaultValue: 'bullet@proof.com', component: VTextField, rules: [rules.required] },
  { name: 'password', label: 'Password', type: 'password', defaultValue: 'pass4word', component: VTextField, rules: [rules.required] },
]

const onSubmit = async (payload: VFormBuilderData) => {
  if (!payload.valid) return

  const service = getApiService()
  const store = service.useStore()

  const response = await service.request({
    method: 'POST',
    url: '/api/auth/sign_in',
    data: {
      mail: payload.data.mail,
      password: payload.data.password,
    },
  })
  store.setAuth(response)
  if (props.redirect) router.push(props.redirect)
}
</script>

<style lang="scss"></style>
