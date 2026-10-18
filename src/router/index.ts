import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView'
import ClueView from '../views/ClueView'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/clues',
    name: 'clues',
    component: ClueView,
  },
  {
    path: '/clues/:id',
    name: 'clue-detail',
    component: ClueView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
