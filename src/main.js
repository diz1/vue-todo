import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify.plugin'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyC7Y9UWy1qwpjxFID5QymTcms3cDHH600c',
  authDomain: 'todo-list-89830.firebaseapp.com',
  databaseURL: 'https://todo-list-89830.firebaseio.com',
  projectId: 'todo-list-89830',
  storageBucket: 'todo-list-89830.appspot.com',
  messagingSenderId: '857571482993',
  appId: '1:857571482993:web:794d46a462bd3162c7ead0'
})

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app')
  }
})
