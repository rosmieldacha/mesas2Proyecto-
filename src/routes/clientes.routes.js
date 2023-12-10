import { Router } from 'express'
import pool from '../database.js'
const router = Router();
router.get('/add1', (req, res)=>{
    res.render('clientes/add1');

});

router.get('/', (req, res) => {
    const showNavbar = false; 
    res.render('auth/login', { showNavbar }); 
});

router.post('/add1', async(req, res)=>{
    try{
        const {nombre, apellido, edad, correo_electronico} = req.body;
        const newClientes = {
            nombre, apellido, edad, correo_electronico
        }
        await pool.query('INSERT INTO clientes SET ?', [newClientes]);
        res.redirect('/list1');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list1', async(req, res)=>{
    try{
        const[result] =await pool.query('SELECT * FROM clientes');
        res.render('clientes/list1', {clientes: result});

    }
    catch(err){
        res.status(500).json({message:err.message});

    }
});
router.get('/edit1/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [clientes] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
        const clientesEdit = clientes[0];
        res.render('clientes/edit1', {clientes: clientesEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit1/:id', async(req, res)=>{
    try{
        const {nombre, apellido, edad, correo_electronico} = req.body;
        const {id} = req.params;
        const editClientes = {nombre, apellido, edad, correo_electronico};
        await pool.query('UPDATE clientes SET ? WHERE id = ?', [editClientes, id]);
        res.redirect('/list1');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete1/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
        res.redirect('/list1');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;