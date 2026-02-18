import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCsdyQ5802o6fgVFxNZXoOhG5Wf7Cgr7cY",
    authDomain: "mindmesh-336a3.firebaseapp.com",
    databaseURL: "https://mindmesh-336a3-default-rtdb.firebaseio.com",
    projectId: "mindmesh-336a3",
    storageBucket: "mindmesh-336a3.firebasestorage.app",
    messagingSenderId: "1094156863186",
    appId: "1:1094156863186:web:7e7307b1f09ddb5cbf4f0b",
    measurementId: "G-3XPR8WEHJP"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);