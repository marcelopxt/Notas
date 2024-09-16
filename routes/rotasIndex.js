var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')

router.get('/', controllerIndex.tela_principal);
router.get('/sobre', controllerIndex.tela_sobre);
router.post("/",controllerIndex.tela_principal); 
router.get('/errorIdNaoEncontrado/:id', controllerIndex.tela_errorID);

module.exports = router;
