// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// YOUR FIREBASE CONFIG
const firebaseConfig = { apiKey: "AIzaSyDP7kmc6UqQvo1OsnIz6sxL6e0m6LNQ7KU", authDomain: "grocery-bill-system.firebaseapp.com", projectId: "grocery-bill-system", storageBucket: "grocery-bill-system.firebasestorage.app", messagingSenderId: "687145141675", appId: "1:687145141675:web:6a7c334529588cfe2cbeee" };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Global Access
window.auth = auth;
window.db = db;

window.createUserWithEmailAndPassword =
  createUserWithEmailAndPassword;

window.signInWithEmailAndPassword =
  signInWithEmailAndPassword;

window.signOut = signOut;

window.collection = collection;
window.addDoc = addDoc;
window.onSnapshot = onSnapshot;