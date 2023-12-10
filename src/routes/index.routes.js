import { Router } from "express";
const router = Router();


router.get('/chat', (req, res)=>{
    res.render('services/chat');

});
router.get('/form', (req, res)=>{
    res.render('services/form');

});


export default router;