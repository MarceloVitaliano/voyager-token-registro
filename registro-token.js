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

// 👉 Tu clave pública VAPID
const vapidKey = "BHwNkY5tzz2VRy3PjDNIE0_KVEezht2AnlcQUr-pf01c6XOpwiTEcNMwxyExZO3n2ZqBh85f9_Tyrw017ku7gos";

async function registrarDispositivo() {
  try {
    const permiso = await Notification.requestPermission();
    if (permiso !== "granted") {
      estado.textContent = "❌ Permiso denegado.";
      throw new Error("Notificaciones no permitidas");
    }

    estado.textContent = "Permiso concedido. Registrando SW...";

    const registration = await navigator.serviceWorker.ready;

    estado.textContent = "Obteniendo token...";
    const token = await messaging.getToken({ vapidKey, serviceWorkerRegistration: registration });

    estado.textContent = "Registrando en Firestore...";
    await db.collection("tokens").doc(token).set({ token, registrado: new Date() });

    estado.textContent = "✅ Token registrado correctamente";

  } catch (err) {
    console.error("Error al registrar el dispositivo:", err);
    estado.textContent = "❌ Error: " + err.message;
  }
}

registrarDispositivo();
