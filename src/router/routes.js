
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/busaojf', component: ()=> import('layouts/MainLayout.vue')},
      { path: '/busaorecife', component: ()=> import('layouts/MainLayout.vue')},
      { path: '/penaltycup', component: ()=> import('layouts/MainLayout.vue')}
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginScreen.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
