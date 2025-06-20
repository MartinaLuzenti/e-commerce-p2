 const express = require('express');
const router = express.Router();
const 
{
    crearPedido
} = require('../controllers/pedidosController');
const { verificarToken, verificarRol } = require('../middlewares/auth');


router.post('/', pedidosController.crearPedido);
router.get('/mios', verificarToken, pedidosController.historialUsuario);


router.get('/', verificarToken, verificarRol('admin'), pedidosController.todosLosPedidos);
router.put('/:id/estado', verificarToken, verificarRol('admin'), pedidosController.actualizarEstado);

module.exports = router;
