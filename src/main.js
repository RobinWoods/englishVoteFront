import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Admin from './components/Admin.vue'
import Home from "@/components/Home.vue";
import Vote from "@/components/Vote.vue";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3333';
const routes = [
    {path : '/', component: Home},
    {path : '/admin', component: Admin},
    {path : '/vote', component: Vote}
]
const router = createRouter({
    history: createWebHistory(),
    routes : routes
});


const app = createApp(App);

app.use(router);

app.mount('#app');
