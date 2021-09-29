import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#wpsfb-admin-app',
  router,
  render: h => h(App)
});
