import { app } from './firebase-config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const auth = getAuth(app);
const db = getFirestore(app);

document.querySelector("#formRegistro").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "usuarios", user.uid), {
            nombre: nombre,
            email: email,
            rol: rol
        });
        alert("Registro exitoso");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error: " + error.message);
    }
});

document.querySelector("#formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso");
        window.location.href = "pagina-posterior.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error: " + error.message);
    }
});
