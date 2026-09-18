// onva fffiché chaque requette reçu 
const logger = (req, res, next)=>{
    const  requette = new Date().toString();
    console.log(`[ ${requette} ${req.method} ${req.url}]`);
    next();
}

module.exports =  logger;