// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore para la base de datos
import { getStorage } from "firebase/storage"; // Firebase Storage para subir archivos

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

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtiene instancias de Firestore y Firebase Storage
const firestore = getFirestore(app);
const storage = getStorage(app);

// Exporta Firestore y Storage para su uso en otros archivos
export { firestore, storage };
