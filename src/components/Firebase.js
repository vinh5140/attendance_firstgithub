import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBXeJjEZlkeFDSkkEEsMxVmQwPiTq-6tVY",
    authDomain: "attendancevn.firebaseapp.com",
    databaseURL: "https://attendancevn-default-rtdb.firebaseio.com",
    projectId: "attendancevn",
    storageBucket: "attendancevn.appspot.com",
    messagingSenderId: "92269848862",
    appId: "1:92269848862:web:06159e7f3e48d960f4410f"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };