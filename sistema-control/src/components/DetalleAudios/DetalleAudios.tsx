import React, { useState } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

// Ya no es necesario inicializar Firebase aquí, solo importa `storage` y `firestore` desde firebase.js

const SubirMusica: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubirMusica = async () => {
    if (!file) {
      Swal.fire('Error', 'Selecciona un archivo para subir.', 'warning');
      return;
    }

    try {
      // Subir el archivo a Firebase Storage
      const storageRef = ref(storage, `musica/${file.name}`);
      console.log(storageRef);

      const snapshot = await uploadBytes(storageRef, file);

      // Obtener la URL del archivo subido
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Guardar metadatos en Firestore
      await addDoc(collection(getFirestore(), 'musica'), {
        name: file.name,
        url: downloadURL,
        uploadedAt: new Date().toISOString(),
      });

      Swal.fire('Éxito', 'Archivo subido y registrado correctamente.', 'success');
    } catch (error) {
      console.error('Error al subir archivo o registrar datos:', error);
      Swal.fire('Error', 'Hubo un problema al subir el archivo.', 'error');
    }
  };

  return (
    <div>
      <h2>Subir Música</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleSubirMusica}>Subir Música</button>
    </div>
  );
};

export default SubirMusica;
