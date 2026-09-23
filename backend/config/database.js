const {Pool} =  require('pg'); //imporattion du module postgree  pour la cnnection 
require('dotenv').config();// le module pour garder mes information personnel


const pool =  new Pool({
connectionString : process.env.DATABASE_URL,
/*user : process.env.user,
host:  process.env.host,
password: process.env.password,
database: process.env.db_name,
port: process.env.db_PORT,*/
});

//confirmation de la connection à la base donnéé
pool.on('connect', ()=>{
    console.log('je viens de me connecter à la base de donnée PostgresSQL')
});

module.exports =  pool;
