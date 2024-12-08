import React, { useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteField } from "firebase/firestore";
import { firestore } from "../../firebase";
import { TextField, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

const Consultas: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const today = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato YYYY-MM-DD

    // Función para realizar la búsqueda de documentos por nombre
    const handleSearch = async () => {
        setLoading(true);
        try {
            const q = collection(firestore, "Feligreses");
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setResults(data);
        } catch (error) {
            console.error("Error al realizar la consulta:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar la propiedad 'password'
    const handleRemovePassword = async () => {
        setLoading(true);
        try {
            const collectionRef = collection(firestore, "Feligreses");
            const snapshot = await getDocs(collectionRef);

            if (snapshot.empty) {
                console.log("No hay documentos en la colección.");
                return;
            }

            const promises = snapshot.docs.map((docSnapshot) => {
                const docRef = doc(firestore, "Feligreses", docSnapshot.id);
                return updateDoc(docRef, {
                    password: deleteField(), // Elimina la propiedad 'password'
                });
            });

            await Promise.all(promises);
            console.log("Propiedad 'password' eliminada de todos los documentos.");
        } catch (error) {
            console.error("Error al eliminar la propiedad 'password':", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para agregar 'fechaNacimiento' con la fecha de hoy
    const handleAddFechaNacimiento = async () => {
        setLoading(true);
        try {
            const collectionRef = collection(firestore, "Feligreses");
            const snapshot = await getDocs(collectionRef);

            if (snapshot.empty) {
                console.log("No hay documentos en la colección.");
                return;
            }

            const promises = snapshot.docs.map((docSnapshot) => {
                const docRef = doc(firestore, "Feligreses", docSnapshot.id);
                return updateDoc(docRef, {
                    fechaNacimiento: today, // Agrega el campo 'fechaNacimiento' con la fecha actual
                });
            });

            await Promise.all(promises);
            console.log(`Campo 'fechaNacimiento' agregado con valor: ${today}.`);
        } catch (error) {
            console.error("Error al agregar el campo 'fechaNacimiento':", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Consultas en la Colección Feligreses
            </Typography>
            <TextField
                label="Buscar por Nombre"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                style={{ marginBottom: "20px" }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={loading || !searchTerm}
                style={{ marginRight: "10px" }}
            >
                {loading ? "Buscando..." : "Buscar"}
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleRemovePassword}
                disabled={loading}
                style={{ marginBottom: "10px" }}
            >
                {loading ? "Eliminando..." : "Eliminar Propiedad 'password'"}
            </Button>
            <Button
                variant="contained"
                color="success"
                onClick={handleAddFechaNacimiento}
                disabled={loading}
            >
                {loading ? "Agregando..." : `Agregar Fecha de Nacimiento (${today})`}
            </Button>

            <List>
                {results.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText
                            primary={item.nombre || "Sin nombre"} // Cambia "nombre" por un campo relevante en Feligreses
                            secondary={`ID: ${item.id}`}
                        />
                    </ListItem>
                ))}
            </List>

            {results.length === 0 && !loading && (
                <Typography variant="body2" color="textSecondary">
                    No se encontraron resultados.
                </Typography>
            )}
        </div>
    );
};

export default Consultas;
