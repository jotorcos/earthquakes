import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import 'leaflet/dist/leaflet.css'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueToast, {
  position: 'top',
  duration: 5000,
  className: 'custom-toast'
})

// Navigate with router within popup
window.Vue = Vue
Vue.router = router

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
