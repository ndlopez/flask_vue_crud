/* This file is the router */
/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import BookThis from '../components/BookThis.vue';
import PingMe from '../components/PingMe.vue';

Vue.use(Router);

let routes = [
  {
    path: '/',
    name: 'Books',
    component: BookThis,
  },
  {
    path: '/ping',
    name:'PingMe',
    component:PingMe,},
]
export default new Router({
	mode: 'history',
  base: process.env.BASE_URL,
  routes
});
