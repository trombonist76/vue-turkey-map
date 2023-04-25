import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import './assets/main.css'

const app = createApp(App);
app.use(PrimeVue);
app.mount('#app')

