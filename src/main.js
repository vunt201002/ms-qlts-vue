import { createApp } from 'vue'
import App from './App.vue'
import "./css/style.css";
import "./css/icon.css";
import "./css/button.css";
import router from './router/router';

const app = createApp(App);

app.use(router);

app.mount('#app');
