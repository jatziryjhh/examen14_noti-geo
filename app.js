import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

// 🔥 Firebase config (del profe)
const firebaseConfig = {
    apiKey: "AIzaSyBPMtb2JbTvQKvJQAQnGw5FaYWpdvMGbeE",
    authDomain: "examen3-firebase.firebaseapp.com",
    projectId: "examen3-firebase",
    messagingSenderId: "920573259228",
    appId: "1:920573259228:web:11739fcc30d606858db319"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const btn = document.querySelector("#btn-geo");
const coords = document.querySelector("#coords");

// Permiso de notificaciones
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

// 📍 Obtener ubicación
btn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        coords.textContent = `Lat: ${latitude} | Lng: ${longitude}`;

        // 🔔 Notificación basada en ubicación
        navigator.serviceWorker.ready.then(reg => {
            reg.showNotification("📍 Ubicación detectada", {
                body: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
                icon: "./192.png"
            });
        });
    }, () => {
        coords.textContent = "No se pudo obtener la ubicación";
    });
});