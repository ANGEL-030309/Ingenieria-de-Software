import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

// Registro de usuario
document.querySelector("#registro form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const rol = e.target[3].value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "usuarios", user.uid), {
            nombre: nombre,
            rol: rol,
            fechaRegistro: new Date().toISOString()
        });

        window.location.href = "pagina-posterior.html";
    } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error en el registro: " + error.message);
    }
});

// Inicio de sesión
document.querySelector("#login form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        window.location.href = "pagina-posterior.html";
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        alert("Error en el inicio de sesión: " + error.message);
    }
});

// Cerrar sesión
document.querySelector(".logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
});

// Verificación del estado de autenticación
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
        if (userDoc.exists()) {
            document.getElementById("nombreUsuario").textContent = userDoc.data().nombre;
            document.getElementById("rolUsuario").textContent = userDoc.data().rol;
        }
    } else {
        window.location.href = "index.html";
    }
});
