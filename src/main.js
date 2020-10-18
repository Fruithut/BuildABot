import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';
import pinDirective from './shared/pin-directive';

const app = createApp(App).use(store).use(router);
app.directive('pin', pinDirective);
app.mount('#app');
