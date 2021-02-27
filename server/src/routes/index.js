const express = require('express');
const router = express.Router();

rutas = require('../controllers/rutas')

router.post('/transaccion',rutas.transaccion)
router.post('/transaccion_error' , rutas.transaccionError);
//router.get('/', transaccion);

module.exports = router;
