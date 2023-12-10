import { Router } from 'express'
import pool from '../database.js'
const router = Router();
router.get('/add2', (req, res)=>{
    res.render('accesorio/add2');

});



router.post('/add2', async(req, res)=>{
    try{
        const {nombre, codigo, marca, detalle, precio} = req.body;
        const newAccesorio = {
            nombre, codigo, marca, detalle, precio
        }
        await pool.query('INSERT INTO accesorio SET ?', [newAccesorio]);
        res.redirect('/list2');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list2', async(req, res)=>{
    try{
        const[result] =await pool.query('SELECT * FROM accesorio');
        res.render('accesorio/list2', {accesorio: result});

    }
    catch(err){
        res.status(500).json({message:err.message});

    }
});
router.get('/edit2/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [accesorio] = await pool.query('SELECT * FROM accesorio WHERE id = ?', [id]);
        const accesorioEdit = accesorio[0];
        res.render('accesorio/edit2', {accesorio: accesorioEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit2/:id', async(req, res)=>{
    try{
        const {nombre, codigo, marca, detalle, precio} = req.body;
        const {id} = req.params;
        const editAccesorio = {nombre, codigo, marca, detalle, precio};
        await pool.query('UPDATE accesorio SET ? WHERE id = ?', [editAccesorio, id]);
        res.redirect('/list2');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete2/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM accesorio WHERE id = ?', [id]);
        res.redirect('/list2');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;