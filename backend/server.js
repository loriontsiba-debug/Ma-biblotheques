const express = require('express')
//const app  = require("./app")
require('dotenv').config();// le module pour garder mes information personnel
const app = express()
const cors = require('cors');
const path = require('path');
//importation des routes
const arrorHandler = require('./middlewares/arrorHandler');
const logger = require('./middlewares/logger')



app.use(express.static(path.join(__dirname, 'public')));
const PORT= process.env.PORT || 5000;
//midleware pour la gestion d'erreur

app.use(cors());
app.use(logger)
app.use(arrorHandler)


//definition des port
app.listen(PORT, ()=>{
 console.log(`mon server est aluumé au  port ${PORT}`)
})

