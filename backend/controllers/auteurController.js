
const pool = require('../config/database'); // importationde la base de donnee

//obtention  de tout les auteurs

exports.TrouverToutAuteurs = async (req, res, next)=>{
    try{
        const result = await pool.query('select *from auteurs order by id ASC');
        res.json(result.rows)
    }catch(error){
        next(error)
    }
}
//trouvé un auteur par sn id
exports.trouverAuteurParId = async (req, res, next)=>{
    try{
        const{id} = req.params;
        const result  =  await pool.query('select* from auteurs where id = $1', [id]);
        if(result.rows.length === 0){
            return res (404).json({message : "pas d'auteur"});
        }
        res.json(result.rows[0])
    }catch(error){
        next(error);
    }
}

//creer un auteur

exports.creerAuteur = async (req, res, next) =>{
    try{
       const {nom, nationalite} = req.body;

       if(!nom){
            return res.status(400).json({message : "le nom est obligatoire"});
        }
        const result = await pool.query('insert into auteurs (nom, nationalite) values($1, $2) returning*',  [nom, nationalite]);
       res.status(201).json(result.rows[0])
    }
    catch(error){
        next(error)
    }
}
// modifier un auteur

exports.modifierAuteur = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const {nom, nationalite} = req.body;
        const result  = await pool.query('update auteurs set nom = $1, nationalite = $1 where id = $3 returning*,'[nom, nationalite, id]);
        if(result.rows.length === 0 ){
            return res.status(404).json({message : "auteur non trouvé"});
        }
        res.json(result.rows[0])
    }
    catch(error){
        next(error)
    }
}

//supprimer un auteurs 

exports.supprimerAteur = async (req, res, next)=>{
   try{
     const {id} = req.params;
    const result =  await pool.query('delete from auteurs where id  = $1 returning*', [id]);

    if(result.rows.length === 0){
        return res.status(404).json({message : 'pas de auteur'});
    }
    res.json({message : 'auteur à été supprimer'});
}
   
   catch(error){
    next(error)
   }
} 

