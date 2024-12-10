import isAuthenticatedGuard from '@/modules/auth/guards/is-uthenticated.guards';
import NotFound from '@/modules/common/pages/NotFound.vue';
import HomePages from '@/modules/views/pages/HomePages.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes: [
    //lading
    {
      path: '/',
      name: 'lading',
      component: () => import('@/modules/views/layouts/LandingLayout.vue'),
      beforeEnter: isAuthenticatedGuard,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePages,
          meta: { requiresAuth: true }
        },
        {
          path: '/administrativo',
          name: 'administrativo',
          component: () => import('@/modules/views/pages/Administrativopages.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/aspectos-legales',
          name: 'aspectos-legales',
          component: () => import('@/modules/views/pages/AspectosLegalesPages.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/monitoreo-actividades',
          name: 'monitoreo-actividades',
          component: () => import('@/modules/views/pages/MonitoreoActividadespages.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/matriz-legal',
          name: 'matriz-legal',
          component: () => import('@/modules/views/pages/MatrizLegalpages.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/configuraciones-matriz-legal',
          name: 'configuraciones-matriz-legal',
          component: () => import('@/modules/views/pages/ConfiguracionesMatrizLegal.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/intereses-pages',
          name: 'intereses-pages',
          component: () => import('@/modules/views/pages/interesespagues.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/visualizador-general/:id',
          name: 'VisualizadorGeneral',
          component: () => import('@/modules/views/pages/VisualizadorGeneral.vue'),
          meta: { requiresAuth: true }
        },
        // tengo que agregar paginas y verificar si ya existen:
        // - intereses
        // - mi matriz
        // - reposte
        // - crear intereses
        // - normas
        // - entidades
        // - tipo de normas
      ]
    },
    // auth
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/modules/auth/pages/LoginPages.vue'),
    },

    // Not found
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})

export default router;
