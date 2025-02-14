import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";
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

const EnviarNotificacion: React.FC = () => {
    const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
    const [mesFiltro, setMesFiltro] = useState<string>("");
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotificaciones = async () => {
            const mensajesRef = collection(db, "mensajes");
            const querySnapshot = await getDocs(mensajesRef);
            const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Notificacion[];
            
            // Ordenar las notificaciones por fecha de menor a mayor
            datos.sort((a, b) => {
                const parseFecha = (fecha: string) => {
                    const [dia, mes] = fecha.trim().split("/").map(Number);
                    return mes * 100 + dia; // Convierte a un número comparable (MMDD)
                };
                return parseFecha(a.fecha) - parseFecha(b.fecha);
            });

            setNotificaciones(datos);
        };

        fetchNotificaciones();
    }, []);

    const handleEliminar = async (id: string) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "mensajes", id));
                    setNotificaciones(notificaciones.filter((notif) => notif.id !== id));
                    Swal.fire("Eliminado", "La notificación ha sido eliminada.", "success");
                } catch (error) {
                    console.error("Error al eliminar:", error);
                    Swal.fire("Error", "Hubo un problema al eliminar la notificación.", "error");
                }
            }
        });
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Medicina al Corazón ❤️‍🩹
                </Typography>
                <TextField
                    select
                    fullWidth
                    label="Filtrar por Mes"
                    value={mesFiltro}
                    onChange={(e) => setMesFiltro(e.target.value)}
                    sx={{ mb: 3 }}
                >
                    <MenuItem value="">Todos</MenuItem>
                    {[...Array(12)].map((_, i) => (
                        <MenuItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                            {`Mes ${i + 1}`}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 3 }} onClick={() => navigate("/crear-notificacion")}>
                    Crear Notificación
                </Button>
                <TableContainer component={Paper} sx={{ mt: 3, mb: 5 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>Referencia (ES)</TableCell>
                                <TableCell>Mensaje (ES)</TableCell>
                                <TableCell>Referencia (EN)</TableCell>
                                <TableCell>Mensaje (EN)</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notificaciones
                                .filter((notif) => mesFiltro === "" || notif.fecha.split("/")[1] === mesFiltro)
                                .map((notif) => (
                                    <TableRow key={notif.id}>
                                        <TableCell>{notif.fecha}</TableCell>
                                        <TableCell>{notif.titulo}</TableCell>
                                        <TableCell>{notif.referenciaEs}</TableCell>
                                        <TableCell>{notif.mensaje_es}</TableCell>
                                        <TableCell>{notif.referenciaEn}</TableCell>
                                        <TableCell>{notif.mensaje_en}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                onClick={() => handleEliminar(notif.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
};

export default EnviarNotificacion;
