import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// icon  https://fontawesome.com/v4.7.0/get-started/
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
