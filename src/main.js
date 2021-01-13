import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'
import store from './store/';

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// Vue.config.productionTip = false;

// Vue.use(router);

// new Vue({
//   store,
//   render: h => h(App)
// }).$mount('#app');


createApp(App).use(router).use(store).mount('#app')