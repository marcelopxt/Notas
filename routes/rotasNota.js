var express = require('express');
var router = express.Router();
var controllerNota = require('../controller/controllerNota.js')

router.get('/cria', controllerNota.cria_get);

router.post('/cria', controllerNota.cria_post);

router.get('/consulta/:id_nota', controllerNota.consulta);

router.get('/altera/:id_nota', controllerNota.altera_get);

router.post('/altera/:id_nota', controllerNota.altera_post);

router.get('/deleta/:id_nota', controllerNota.deleta);

router.get("/alteratag/:id_nota", controllerNota.mudarTag); 

module.exports = router;
