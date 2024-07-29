import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDXYWAbl8UXBZ-niJpUZUUYsUTiuqEk_TA",
    authDomain: "era-biz-a2ac6.firebaseapp.com",
    projectId: "era-biz-a2ac6",
    storageBucket: "era-biz-a2ac6.appspot.com",
    messagingSenderId: "939179027734",
    appId: "1:939179027734:web:e78e6f3c4d47ca8e20f437",
    measurementId: "G-WX5VXX3YHW"
  };

firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default firebase;
