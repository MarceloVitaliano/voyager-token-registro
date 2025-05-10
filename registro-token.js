// TODO: Reemplaza con tu configuración real de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const db = firebase.firestore();

const estado = document.getElementById("estado");

// TODO: Reemplaza con tu clave pública VAPID
const vapidKey = "TU_CLAVE_VAPID_PUBLICA";

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
