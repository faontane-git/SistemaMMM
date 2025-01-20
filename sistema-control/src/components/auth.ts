import { firestore } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

export const login = async (email: string, password: string) => {
    try {
        const usersRef = collection(firestore, 'Usuarios');
        const q = query(usersRef, where('user', '==', email)); // Buscamos solo por usuario
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();

            if (userData.password === password) { // ¡⚠️ No seguro! Debes usar hashing en la base de datos.
                const user = { email: userData.user, name: userData.name };
                sessionStorage.setItem("user", JSON.stringify(user));
                return { success: true, user };
            } else {
                return { success: false, message: "Contraseña incorrecta" };
            }
        } else {
            return { success: false, message: "Usuario no encontrado" };
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return { success: false, message: "Ocurrió un error al iniciar sesión." };
    }
};

// Obtener usuario autenticado
export const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user") || "null");
};

// Cerrar sesión
export const logout = () => {
    sessionStorage.removeItem("user");
};
