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

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id_link = ?', [id]);
    res.redirect('/links'); 
});

router.get('/', async (req, res)=>{
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', { links });
});

router.get('/edit/:id_link', async (req, res) => {
    const { id_link } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id_link = ?', [id_link]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id_link', async (req, res) => {
    const { id_link } = req.params;
    const { titulo, descripcion, url} = req.body; 
    const newLink = {
        titulo,
        descripcion,
        url
    };
    await pool.query('UPDATE links SET ? WHERE id_link = ?', [newLink, id_link]);
    res.redirect('/links');
});

module.exports=router;