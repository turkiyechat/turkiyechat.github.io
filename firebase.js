import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {

    apiKey: "AIzaSyDmoYnxezBRO7nYBIjog4rKcALmLoSmAt4",

    authDomain: "turkiyechatgithubio.firebaseapp.com",

    projectId: "turkiyechatgithubio",

    storageBucket: "turkiyechatgithubio.firebasestorage.app",

    messagingSenderId: "738615117298",

    appId: "1:738615117298:web:84e178a87a3427a4cf976b",

    measurementId: "G-TC0ZJ1LB4G"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

console.log("✅ Firebase bağlandı.");