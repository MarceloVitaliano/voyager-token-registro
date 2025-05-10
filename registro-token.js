// TODO: Reemplaza con tu configuración real de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXf7B3J6O5nvDPr7zlnfxQ4HGRKNIBQbU",
  authDomain: "voyager-app-8c677.firebaseapp.com",
  projectId: "voyager-app-8c677",
  storageBucket: "voyager-app-8c677.firebasestorage.app",
  messagingSenderId: "19194177029",
  appId: "1:19194177029:web:fb8e809b2a62923c29de6c"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const db = firebase.firestore();

const estado = document.getElementById("estado");

// TODO: Reemplaza con tu clave pública VAPID
const vapidKey = "BHwNkY5tzz2VRy3PjDNIE0_KVEezht2AnlcQUr-pf01c6XOpwiTEcNMwxyExZO3n2ZqBh85f9_Tyrw017ku7gos";

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    estado.textContent = "Permiso concedido. Obteniendo token...";
    return messaging.getToken({ vapidKey });
  } else {
    estado.textContent = "Permiso denegado.";
    throw new Error("Notificaciones no permitidas");
  }
}).then((token) => {
  estado.textContent = "Token obtenido. Registrando...";
  return db.collection("tokens").doc(token).set({ token, registrado: new Date() });
}).then(() => {
  estado.textContent = "✅ Token registrado correctamente";
}).catch((err) => {
  console.error(err);
  estado.textContent = "❌ Error: " + err.message;
});
