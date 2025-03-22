// Importa los módulos de Firebase
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, addDoc } from './firebase.js';

// Selecciona los formularios
const registroForm = document.querySelector('#registro form');
const loginForm = document.querySelector('#login form');

// Maneja el registro de usuarios
registroForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Obtiene los valores de los campos
  const nombre = registroForm.querySelector('input[type="text"]').value;
  const email = registroForm.querySelector('input[type="email"]').value;
  const password = registroForm.querySelector('input[type="password"]').value;
  const rol = registroForm.querySelector('select').value;

  // Registra al usuario
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado:", userCredential.user);

    // Guarda los datos adicionales en Firestore
    await guardarUsuarioEnFirestore(userCredential.user.uid, nombre, rol);
    alert("¡Registro exitoso!");
    window.location.href = 'pagina-posterior.html'; // Redirige a otra página
  } catch (error) {
    console.error("Error al registrar:", error.message);
    alert("Error al registrar: " + error.message);
  }
});

// Maneja el inicio de sesión
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Obtiene los valores de los campos
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Inicia sesión
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario conectado:", userCredential.user);
    alert("¡Inicio de sesión exitoso!");
    window.location.href = 'pagina-posterior.html'; // Redirige a otra página
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    alert("Error al iniciar sesión: " + error.message);
  }
});

// Guarda los datos del usuario en Firestore
const guardarUsuarioEnFirestore = async (userId, nombre, rol) => {
  try {
    await addDoc(collection(db, "usuarios"), {
      userId: userId,
      nombre: nombre,
      rol: rol,
      fechaRegistro: new Date()
    });
    console.log("Usuario guardado en Firestore");
  } catch (error) {
    console.error("Error al guardar en Firestore:", error);
  }
};
