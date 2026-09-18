const express = require('express');

const router  = express.Router();
const livresController = require('../controllers/livresController');

router.get('/', livresController.obtenirLivres);
router.get('/:id', livresController.obtenirLivreParId);
router.post('/', livresController.ajouterLivres);
router.put('/', livresController.modifierLivre);
router.delete('/', livresController.supprimerLivre)

module.exports = router;