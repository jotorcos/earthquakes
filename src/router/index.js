import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Earthquakes',
      component: () => import('@/views/earthquakes/Earthquakes')
    },
    {
      path: '/earthquakes/:id',
      name: 'EarthquakeDetail',
      props: true,
      required: true,
      component: () => import('@/views/earthquakes/EarthquakeDetail')
    }
  ]
})
