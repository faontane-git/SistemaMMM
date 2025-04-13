import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

const EnviarNotificacion = () => {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviarNotificaciones = async () => {
    setEnviando(true);

    try {
      const querySnapshot = await getDocs(collection(firestore, 'PushTokens'));
      const tokens: string[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.token) {
          tokens.push(data.token);
        }
      });

      // Agrupar en lotes de 100
      const chunks = [];
      for (let i = 0; i < tokens.length; i += 100) {
        chunks.push(tokens.slice(i, i + 100));
      }

      for (const chunk of chunks) {
        const mensajes = chunk.map(token => ({
          to: token,
          sound: 'default',
          title: titulo,
          body: mensaje,
          channelId: 'default',
          data: { customData: 'info' },
        }));

        await axios.post('https://exp.host/--/api/v2/push/send', mensajes, {
          headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
        });
      }

      alert('Notificaciones enviadas con éxito');
    } catch (error) {
      console.error('Error enviando notificaciones:', error);
      alert('Error enviando notificaciones');
    }

    setEnviando(false);
  };

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Enviar Notificación</Typography>
        <TextField
          fullWidth
          label="Título"
          margin="normal"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          fullWidth
          label="Mensaje"
          margin="normal"
          multiline
          rows={4}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={enviando}
          onClick={enviarNotificaciones}
          sx={{ mt: 2 }}
        >
          {enviando ? 'Enviando...' : 'Enviar'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnviarNotificacion;
