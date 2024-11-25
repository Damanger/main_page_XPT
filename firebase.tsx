import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB64TDzIN0b6eGurquMMz-0mPna69DpS5w",
    authDomain: "xpt-developers.firebaseapp.com",
    projectId: "xpt-developers",
    storageBucket: "xpt-developers.firebasestorage.app",
    messagingSenderId: "336796297298",
    appId: "1:336796297298:web:62e29ca5cd48ba633f978b",
    measurementId: "G-NY5B8FGNH5",
};

// Inicializar Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Inicializar Analytics (opcional)
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

const db = getDatabase(app);

export { app, analytics, db };
