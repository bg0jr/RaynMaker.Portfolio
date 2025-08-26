import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import CoreuiVue from '@coreui/vue';

const routes = [
  { path: '/Positions', alias: '/', component: () => import('./views/Positions/Open/Positions.vue') },
  { path: '/Performance', component: () => import('./views/Performance/Performance.vue') },
  { path: '/Cashflow', component: () => import('./views/Cashflow/Cashflow.vue') },
  { path: '/ClosedPositions', component: () => import('./views/Positions/Closed/ClosedPositions.vue') },
  {
    path: '/PositionDetails',
    name: 'PositionDetails',
    component: () => import('./views/Positions/Details/PositionDetails.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
});

const app = createApp(App);
app.use(router);
app.use(CoreuiVue);
app.mount('#app');
