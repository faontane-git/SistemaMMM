// Importa la función necesaria del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Cambiado a firebase/firestore

// Configuración de tu aplicación Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7Zwgo5PDAWSD2RarNqWgZknU_GeulGck",
    authDomain: "sistemaiglesiammm.firebaseapp.com",
    projectId: "sistemaiglesiammm",
    storageBucket: "sistemaiglesiammm.appspot.com",
    messagingSenderId: "145755295166",
    appId: "1:145755295166:web:d7bc8c618c0ffcfdd57def",
    measurementId: "G-3J1YLV5RXP"
};


// Inicializa tu aplicación Firebase
export const app = initializeApp(firebaseConfig);
// Obtiene una instancia de Firestore
const firestore = getFirestore(app);

// Exporta la instancia de Firestore para su uso en otros archivos
export { firestore };