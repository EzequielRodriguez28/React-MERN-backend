/*
    Event routes
    /api/events
*/
const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos}= require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt');
const{getEventos,crearEvento,actualizarEvento,eliminarEvento} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Todas tienen que pasr por la validacion de  JWT
router.use(validarJWT);


//Obtener eventos
router.get('/', getEventos);

//crear un evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatotio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatotia').custom( isDate),
        check('end', 'Fecha de finalizacion  es obligatotia').custom( isDate),
        validarCampos
    ],
     crearEvento);

//actualizar  eventos
router.put('/:id', actualizarEvento);

//borrar eventos
router.delete('/:id', eliminarEvento);




module.exports = router;