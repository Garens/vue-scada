// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// import VueMqtt from 'vue-mqtt';
// Vue.use(VueMqtt, 'http://localhost:7411');

import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://192.168.12.98:8080', store);

import axios from 'axios'
Vue.prototype.$http = axios

// import mqtt from '@/assets/mqtt'

// Vue.use(mqtt, 'ws://localhost:7410');
// var client = mqtt.connect('ws://localhost:7410');


Vue.use(iView);
// Vue.use(client);

Vue.config.productionTip = false;

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
