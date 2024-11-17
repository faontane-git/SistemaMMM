import React, { useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteField, query, where } from "firebase/firestore";
import { firestore } from "../../firebase"; // Asegúrate de que esta sea la configuración correcta
import { TextField, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

const Consultas: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(firestore, "Feligreses"), // Cambia "Feligreses" por el nombre exacto de tu colección
                where("nombre", "==", searchTerm) // Cambia "nombre" por el campo que deseas buscar
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
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

    const handleRemoveFoto = async () => {
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
                    foto: deleteField(),
                });
            });

            await Promise.all(promises);
            console.log("Propiedad 'foto' eliminada de todos los documentos.");
        } catch (error) {
            console.error("Error al eliminar la propiedad 'foto':", error);
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
                color="secondary"
                onClick={handleRemoveFoto}
                disabled={loading}
            >
                {loading ? "Eliminando..." : "Eliminar Propiedad 'foto'"}
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
