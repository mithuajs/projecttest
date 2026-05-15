// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDP7kmc6UqQvo1OsnIz6sxL6e0m6LNQ7KU",
  authDomain: "grocery-bill-system.firebaseapp.com",
  projectId: "grocery-bill-system",
  storageBucket: "grocery-bill-system.firebasestorage.app",
  messagingSenderId: "687145141675",
  appId: "1:687145141675:web:6a7c334529588cfe2cbeee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// GLOBAL
window.auth = auth;
window.createUserWithEmailAndPassword =
  createUserWithEmailAndPassword;

window.signInWithEmailAndPassword =
  signInWithEmailAndPassword;

window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;