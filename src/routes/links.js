const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('links/add');
});

router.post('/add', async (req, res)=>{
    const {titulo, url, descripcion}=req.body;
    const nuevo={
        titulo,
        url,
        descripcion
    }
    await pool.query('INSERT INTO links SET ?', [nuevo]);
    res.redirect('/links');
});

router.get('/', async (req, res)=>{
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', { links });
});

module.exports=router;