// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const { VITE_FIREBASE_KEY } = import.meta.env;
const firebaseConfig = {
  apiKey: VITE_FIREBASE_KEY,
  authDomain: "fcmproject-9570f.firebaseapp.com",
  projectId: "fcmproject-9570f",
  storageBucket: "fcmproject-9570f.firebasestorage.app",
  messagingSenderId: "1081420344191",
  appId: "1:1081420344191:web:b51fdb967b8df53ca4084a",
  measurementId: "G-7KNFNW2ZGW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Cloud Messaging 인스턴스 생성
const messaging = getMessaging(app);

export { messaging };
