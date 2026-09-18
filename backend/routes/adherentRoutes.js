const express =  require('express');
const router = express.Router()
const adherentControlleur = require('../controllers/adherentController')
//mes routes à utiliser

router.get('/',  adherentControlleur.toutAdherent)
router.post('/',  adherentControlleur.ajouteAdherents)
router.get('/:id',  adherentControlleur.adherentsId )
router.put('/:id',  adherentControlleur.modifieAderents)
router.delete('/:id',  adherentControlleur.supprimerAderents)
module.exports = router; 