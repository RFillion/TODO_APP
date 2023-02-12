// Import the functions you need from the SDKs you need
import { initializeApp } from '@firebase/app';
import { Capacitor } from '@capacitor/core';
import { getAuth, indexedDBLocalPersistence, initializeAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDF5-oZwDPScnQK95DZQxazN4vDhRX03oA",
  authDomain: "listo-9af54.firebaseapp.com",
  projectId: "listo-9af54",
  storageBucket: "listo-9af54.appspot.com",
  messagingSenderId: "537526309004",
  appId: "1:537526309004:web:3e71698799e4b977fdeba9",
  measurementId: "G-B5SFLTCYM8"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig)
if (Capacitor.isNativePlatform()) {
  initializeAuth(app, {
    persistence: indexedDBLocalPersistence
  });
}
export const auth = getAuth(app)