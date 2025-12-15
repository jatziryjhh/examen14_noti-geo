import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBPMtb2JbTvQKvJQAQnGw5FaYWpdvMGbeE",
    authDomain: "examen3-firebase.firebaseapp.com",
    projectId: "examen3-firebase",
    storageBucket: "examen3-firebase.firebasestorage.app",
    messagingSenderId: "920573259228",
    appId: "1:920573259228:web:11739fcc30d606858db319"
};

initializeApp(firebaseConfig);
getMessaging();

const btn = document.querySelector("#btn-geo");
const coords = document.querySelector("#coords");

let map, marker;

// Permiso notificaciones
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

btn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        coords.textContent = `Lat: ${latitude} | Lng: ${longitude}`;

        // MAPA
        if (!map) {
            map = L.map("map").setView([latitude, longitude], 16);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap"
            }).addTo(map);
            marker = L.marker([latitude, longitude]).addTo(map);
        } else {
            map.setView([latitude, longitude], 16);
            marker.setLatLng([latitude, longitude]);
        }

        // 🔔 Notificación basada en ubicación
        navigator.serviceWorker.ready.then(reg => {
            reg.showNotification("📍 Ubicación detectada", {
                body: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
                icon: "./192.png"
            });
        });
    });
});