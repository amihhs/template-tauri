import { createMemoryHistory, createRouter } from 'vue-router'
import routes from '~pages'

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
