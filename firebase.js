// Importa los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIU4fwzGijwNTkdieKW8Q60fMbn3rrwvg",
  authDomain: "ingenova-6da56.firebaseapp.com",
  projectId: "ingenova-6da56",
  storageBucket: "ingenova-6da56.firebasestorage.app",
  messagingSenderId: "255346301463",
  appId: "1:255346301463:web:35c7325c09ab634876da52",
  measurementId: "G-H3FLH6S41Y"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta los módulos necesarios
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc };
