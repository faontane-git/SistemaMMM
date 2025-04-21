import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// Configurar el transporter
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

export const sendEmail = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Método no permitido');
      return;
    }
  
    const { to, subject, text, html } = req.body;
  
    if (!to) {
      res.status(400).send('Falta el destinatario (to)');
      return;
    }
  
    const mailOptions = {
      from: `Tu App <${functions.config().gmail.email}>`,
      to,
      subject: subject || 'Sin asunto',
      text: text || '',
      html: html || ''
    };
  
    mailTransport.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error enviando email:', error);
        res.status(500).send('Error al enviar el correo');
        return;
      }
      res.status(200).send('Correo enviado con éxito');
    });
  });