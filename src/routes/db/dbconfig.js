import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAUrKtujJ1t7tXdYGqrblJ2DOQfwJ2kSc",
    authDomain: "masters-schedule.firebaseapp.com",
    projectId: "masters-schedule",
    storageBucket: "masters-schedule.appspot.com",
    messagingSenderId: "1011659443337",
    appId: "1:1011659443337:web:6eb510d672b85cb3cc0a58"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//# sourceMappingURL=dbconfig.js.map