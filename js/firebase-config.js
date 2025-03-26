// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyB85dCgcOyQpuX0WkAk6nFBGeT13B1F5qY",
  authDomain: "babsangfriend.firebaseapp.com",
  projectId: "babsangfriend",
  storageBucket: "babsangfriend.firebasestorage.app",
  messagingSenderId: "368052976949",
  appId: "1:368052976949:web:7d07cbc5f2d9b5ea9ee07c",
  measurementId: "G-N7WXHJEKCT"
};

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig);

// Firebase 인증 객체 얻기
const auth = getAuth(firebaseApp);

// 인증 객체 내보내기
export { auth };
