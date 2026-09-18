const express  = require('express');
const app = express();
const cors = require('cors');
 
app.use(cors())
app.use(express.json());

//// importation des route 
const auteursRoutes = require('./routes/auteurRoutes')
const adherentsRoutes = require('./routes/adherentRoutes')
const livresRouter = require('./routes/livresRoutes')
const empruntRouter =  require('./routes/empruntRoutes')
const statRoutes = require('./routes/statistiqueRoutes')


//mes middlewares
//middleware de verification



// ma premiere routes pour les auteurs
app.use('/api/auteurs', auteursRoutes)
//deuxiemme route  pour les adherents
app.use('/api/adherents',  adherentsRoutes)
//troisème route pour les livres
app.use('/api/livres', livresRouter)
//quatriemme route
app.use('/api/emprunts',empruntRouter )
//cinquieme routes
app.use('/api/stats',  statRoutes)




module.exports = app;