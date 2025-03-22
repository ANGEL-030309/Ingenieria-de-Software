import { app } from './firebase-config.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

document.querySelector("#formRegistro").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formulario de registro enviado");
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;
    console.log("Datos capturados:", nombre, email, password, rol);

    try {
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado:", userCredential.user);

        const db = getFirestore(app);
        await setDoc(doc(db, "usuarios", userCredential.user.uid), {
            nombre: nombre,
            email: email,
            rol: rol
        });
        console.log("Datos guardados en Firestore");
        alert("Registro exitoso");
        window.location.href = "pagina-posterior.html";
    } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error en el registro: " + error.message);
    }
});
