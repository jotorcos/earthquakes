import Vue from 'vue'
import router from './router'
import App from './App.vue'
import './assets/scss/main.scss'
import 'leaflet/dist/leaflet.css'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

Vue.config.productionTip = false

Vue.use(VueToast, {
  position: 'top',
  duration: 50000,
  className: 'custom-toast'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
