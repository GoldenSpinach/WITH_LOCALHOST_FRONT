importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyACO6J66qkRyOppdB8wpZaFjCtW_DeLkvc",
  authDomain: "fcmproject-9570f.firebaseapp.com",
  projectId: "fcmproject-9570f",
  storageBucket: "fcmproject-9570f.firebasestorage.app",
  messagingSenderId: "1081420344191",
  appId: "1:1081420344191:web:b51fdb967b8df53ca4084a",
  measurementId: "G-7KNFNW2ZGW",
};
// Firebase 초기화
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
