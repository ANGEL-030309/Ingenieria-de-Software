// Ejemplo de funcionalidad básica
document.querySelector('.login-btn').addEventListener('click', function() {
    alert('Redirigiendo a la página de inicio de sesión...');
});

// Registro de usuarios
const registrarUsuario = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario registrado:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error al registrar:", error.message);
    });
};

// Inicio de sesión
const iniciarSesion = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario conectado:", userCredential.user);
      window.location.href = 'pagina-posterior.html'; // Redirige a otra página
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.message);
    });
};
