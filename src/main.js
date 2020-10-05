import Vue from 'vue'
import router from './router'
import App from './App.vue'
import './assets/scss/main.scss'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
