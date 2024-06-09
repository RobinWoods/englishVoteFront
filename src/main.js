import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from "@/components/Home.vue";
import Vote from "@/components/Vote.vue";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
const routes = [
    {path : '/', component: Home},
    {path : '/vote', component: Vote}
]
const router = createRouter({
    history: createWebHistory(),
    routes : routes
});

const app = createApp(App);

app.use(router);

app.mount('#app');
