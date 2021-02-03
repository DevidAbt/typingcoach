import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'
import store from './store/';

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')