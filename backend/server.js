const express  = require('express');
const app = express();
//const app  = require("./app")
require('dotenv').config();// le module pour garder mes information personnel
const cors = require('cors');
const path = require('path')

//importation des routes
const arrorHandler = require('./middlewares/arrorHandler');
const logger = require('./middlewares/logger')
const validation = require('./middlewares/validation')



const PORT= process.env.PORT || 5000;
//midleware pour la gestion d'erreur
app.use(express.static(path.join(__dirname, ('public'))));
app.get('/', (req, res)=>{
    res.send('bienvenu sur votre api')
})
app.use(cors());
app.use(logger)
app.use(arrorHandler)

//definition des port
app.listen(PORT, ()=>{
 console.log(`mon server est aluumé au  port ${PORT}`)
})

