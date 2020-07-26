const express = require('express');

const app = express();

/**
 * NOTE:
 *  Define proxy in package.json so you can make requests to the backend
 *  without having to include the direction (http://localhost:5000). 
 *  You can do "fetch/api/partida" and it'll know where to go
 */
app.get('/api/partida', (req, res) => {
    const partida = [
        {
            id: 1,
            retador: {
                    nombre: "santi"
            },
            contrincante: {
                    nombre: "seba"
            },
            nombre: "partida de santi",
            estado: "espera"
        },
        {
            id: 2,
            retador: {
                    nombre: "santi2"
            },
            contrincante: {
                    nombre: "seba2"
            },
            nombre: "partida de santi2",
            estado: "comenzado"
        },
        {
            id: 3,
            retador: {
                    nombre: "santi3"
            },
            contrincante: {
                    nombre: "seba3"
            },
            nombre: "partida de santi3",
            estado: "finalizado"
        }
    ];

    res.json(partida);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));