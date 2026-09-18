const express  =  require('express');
const router  = express.Router();
const {validerAuteur} = require('../middlewares/validation')
const auteurController = require('../controllers/auteurController')


//definition des routes pour auteurs
router.get('/', auteurController.TrouverToutAuteurs)
router.get('/:id', auteurController.trouverAuteurParId)
router.post('/', validerAuteur, auteurController.creerAuteur)
router.put('/:id', auteurController.modifierAuteur)
router.delete('/:id', auteurController.supprimerAteur)

module.exports  = router
 