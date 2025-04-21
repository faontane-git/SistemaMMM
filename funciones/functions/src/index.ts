import * as functions from "firebase-functions/v1";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "proyectommm9@gmail.com",
        pass: "Elguapo10",
    },
});

export const sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
    const email = user.email;
    const displayName = user.displayName || "Usuario";

    const mailOptions = {
        from: `"Tu App" <proyectommm9@gmail.com>`,
        to: email,
        subject: "¡Bienvenido a nuestra aplicación!",
        html: `<h1>Hola ${displayName},</h1><p>Gracias por registrarte en nuestra app.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Correo de bienvenida enviado a:", email);
    } catch (error) {
        console.error("Error al enviar el correo de bienvenida:", error);
    }
});
