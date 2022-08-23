/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import PingMe from '../components/Ping.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/ping',
      name:'Ping',
      component:PingMe,},
  ],
});

