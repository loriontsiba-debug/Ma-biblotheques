const  express = require('express')
const router  = express.Router()
const empruntController = require('../controllers/empruntController')


router.get('/', empruntController.voirEmprunt)
router.post('/', empruntController.ajoutEmprunt)
router.put('/:id/retour', empruntController.retourEmprunt)

module.exports = router;