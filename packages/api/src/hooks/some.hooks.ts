import { getEventDispatcher } from '../locator'

const eventDispatcher = getEventDispatcher()

eventDispatcher.subscribe('after.sign_in', async (payload) => {
  console.log('User Signed In')
})
