import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardActionArea,
} from '@mui/material';

interface Noticia {
    id: string;
    titulo: string;
}

const Audios: React.FC = () => {
    const [noticias, setNoticias] = useState<Noticia[]>([]);

    useEffect(() => {
        const noticiasEjemplo: Noticia[] = [
            {
                id: '1',
                titulo: 'Nuevo Audio',
            },
            {
                id: '2',
                titulo: 'Actualización Audios',
            },
        ];
        setNoticias(noticiasEjemplo);
    }, []);

    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: 4,
                    pt: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold', color: '#3a6073', mb: 4 }}
                    >
                        Audios
                    </Typography>

                    {noticias.length === 0 ? (
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{ color: '#888', fontStyle: 'italic', marginTop: 4 }}
                        >
                            No hay noticias disponibles en este momento.
                        </Typography>
                    ) : (
                        <Grid container spacing={4} justifyContent="center" alignItems="center">
                            {noticias.map((noticia, index) => (
                                <Grid item key={noticia.id}>
                                    <Card
                                        sx={{
                                            width: 300,
                                            height: 300,
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            borderRadius: 4,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            '&:hover': {
                                                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                                                transform: 'scale(1.05)',
                                            },
                                            transition: 'all 0.3s ease-in-out',
                                        }}
                                    >
                                        <CardActionArea
                                            component={Link}
                                            to={index === 0 ? '/subir-audio' : `/detalle-audio`}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '100%',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                    padding: 3,
                                                }}
                                            >
                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                    {noticia.titulo}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>
        </div>
    );
};

export default Audios;
