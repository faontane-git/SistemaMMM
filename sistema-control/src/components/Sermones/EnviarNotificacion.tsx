import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";
import Navbar from "../Navbar";

const EnviarNotificacion: React.FC = () => {
  const [titulo, setTitulo] = useState("Medicina al Corazón ❤️‍🩹");
  const [referenciaEs, setReferenciaEs] = useState("");
  const [referenciaEn, setReferenciaEn] = useState("");
  const [mensajeEs, setMensajeEs] = useState("");
  const [mensajeEn, setMensajeEn] = useState("");

  // Inicializar Firestore
  const db = getFirestore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!referenciaEs || !mensajeEs || !referenciaEn || !mensajeEn) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const mensajesRef = collection(db, "mensajes");
      const q = query(mensajesRef, where("titulo", "==", titulo));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Si ya existe, obtener el ID del primer documento encontrado
        const docId = querySnapshot.docs[0].id;
        const mensajeDocRef = doc(db, "mensajes", docId);

        await setDoc(mensajeDocRef, {
          titulo,
          referenciaEs,
          referenciaEn,
          mensaje_es: mensajeEs,
          mensaje_en: mensajeEn,
          fecha: new Date(),
        });

        Swal.fire({
          title: "Notificación actualizada",
          text: "El mensaje ha sido actualizado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        // Si no existe, lo crea
        const nuevoDocRef = doc(mensajesRef);
        await setDoc(nuevoDocRef, {
          titulo,
          referenciaEs,
          referenciaEn,
          mensaje_es: mensajeEs,
          mensaje_en: mensajeEn,
          fecha: new Date(),
        });

        Swal.fire({
          title: "Notificación creada",
          text: "El mensaje ha sido guardado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }

      // Limpiar formulario
      setTitulo("Medicina al Corazón ❤️‍🩹");
      setReferenciaEs("");
      setReferenciaEn("");
      setMensajeEs("");
      setMensajeEn("");
    } catch (error) {
      console.error("Error al guardar o actualizar el mensaje:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar la notificación.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Medicina al Corazón ❤️‍🩹
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Referencia Bíblica Español"
                value={referenciaEs}
                onChange={(e) => setReferenciaEs(e.target.value)}
                placeholder="Ej: Jeremías 29:11 📖"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensaje en Español"
                value={mensajeEs}
                onChange={(e) => setMensajeEs(e.target.value)}
                placeholder="Escribe el mensaje en español"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Referencia Bíblica Inglés"
                value={referenciaEn}
                onChange={(e) => setReferenciaEn(e.target.value)}
                placeholder="Ej: Jeremiah 29:11 📖"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensaje en Inglés"
                value={mensajeEn}
                onChange={(e) => setMensajeEn(e.target.value)}
                placeholder="Escribe el mensaje en inglés"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 4, fontSize: "16px", fontWeight: "bold", padding: 1.5 }}
          >
            Guardar Notificación
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default EnviarNotificacion;
