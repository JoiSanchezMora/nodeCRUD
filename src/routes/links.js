const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('links/add');
});

router.post('/add', (req, res)=>{
    const {titulo, url, descripcion}=req.body;
    const nuevo={
        titulo,
        url,
        descripcion
    }
    pool.query('INSERT INTO links SET ?', [nuevo]);
    res.send('recibido');
});

module.exports=router;