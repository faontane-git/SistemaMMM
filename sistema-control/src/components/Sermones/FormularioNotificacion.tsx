import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import {
    Container,
    TextField,
    Typography,
    Button,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    CardContent,
    MenuItem
} from "@mui/material";
import Swal from "sweetalert2";
import Navbar from "../Navbar";

interface Notificacion {
    id: string;
    fecha: string;
    mensaje_en: string;
    mensaje_es: string;
    referenciaEn: string;
    referenciaEs: string;
    titulo: string;
}

const FormularioNotificacion: React.FC = () => {
    const [titulo, setTitulo] = useState("Medicina al Corazón ❤️‍🩹");
    const [referenciaEs, setReferenciaEs] = useState("");
    const [referenciaEn, setReferenciaEn] = useState("");
    const [mensajeEs, setMensajeEs] = useState("");
    const [mensajeEn, setMensajeEn] = useState("");
    const [dia, setDia] = useState<string>("");
    const [mes, setMes] = useState<string>("");
    const navigate = useNavigate();
    const db = getFirestore();

    const dias = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fecha = `${dia}/${mes}`;

        if (!referenciaEs || !mensajeEs || !referenciaEn || !mensajeEn || !dia || !mes) {
            Swal.fire("Campos incompletos", "Por favor, completa todos los campos.", "error");
            return;
        }

        try {
            const mensajesRef = collection(db, "mensajes");
            const nuevoDocRef = doc(mensajesRef);
            await setDoc(nuevoDocRef, {
                titulo,
                referenciaEs,
                referenciaEn,
                mensaje_es: mensajeEs,
                mensaje_en: mensajeEn,
                fecha,
            });

            Swal.fire("Notificación creada", "El mensaje ha sido guardado con éxito.", "success");
            navigate("/enviarNotificacion");
        } catch (error) {
            console.error("Error al guardar la notificación:", error);
            Swal.fire("Error", "Hubo un problema al procesar la notificación.", "error");
        }
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Crear Notificación
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Día"
                                        value={dia}
                                        onChange={(e) => setDia(e.target.value)}
                                    >
                                        {dias.map((d) => (
                                            <MenuItem key={d} value={d}>{d}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Mes"
                                        value={mes}
                                        onChange={(e) => setMes(e.target.value)}
                                    >
                                        {meses.map((m) => (
                                            <MenuItem key={m} value={m}>{m}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Referencia Bíblica Español" value={referenciaEs} onChange={(e) => setReferenciaEs(e.target.value)} placeholder="Ej: Jeremías 29:11 📖" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Mensaje en Español" value={mensajeEs} onChange={(e) => setMensajeEs(e.target.value)} placeholder="Escribe el mensaje en español" multiline rows={4} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Referencia Bíblica Inglés" value={referenciaEn} onChange={(e) => setReferenciaEn(e.target.value)} placeholder="Ej: Jeremiah 29:11 📖" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Mensaje en Inglés" value={mensajeEn} onChange={(e) => setMensajeEn(e.target.value)} placeholder="Escribe el mensaje en inglés" multiline rows={4} />
                                </Grid>
                            </Grid>
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4, fontWeight: "bold" }}>
                                Guardar Notificación
                            </Button>
                            <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/enviarNotificacion")}> 
                                Regresar
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default FormularioNotificacion;
