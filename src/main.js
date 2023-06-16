import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import App from './App.vue'

import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
import './assets/main.css'

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.mount('#app')

