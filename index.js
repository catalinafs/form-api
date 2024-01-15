const express = require('express');
const bodyParser = require('body-parser');
const { valid } = require('./middlewares/valid');
const app = express();
const port = 5000;

let info = [];

app.use(bodyParser.json());

// GET: mostrar all
app.get('/', (req, res) => {
    res.status(200).json(info);
});

// GET: mostrar por parametro 1
app.get('/:index', (req, res) => {
    res.status(200).json(info[req.params.index]);
});

// POST: nombre, apellido, telefono, email
app.post('/', valid, (req, res) => {
    info.push(req.body);

    res.status(200).json({ msg: 'ingresado correctamente' });
});

// PUT: actualizar solo 1 por parametro
app.put('/:index', valid, (req, res) => {
    const { index } = req.params;
    const { body } = req;

    for (let key in body) {
        info[index][key] = body[key];
    }

    res.status(200).json({ msg: 'se actualizo correctamente' });
});

// DELETE: eliminar por parametro
app.delete('/:number', (req, res) => {
    info.splice(req.params.number, 1);

    res.status(200).json({ msg: 'se elimino correctamente' });
});

app.listen(port, () => {
    console.log('its working');
});