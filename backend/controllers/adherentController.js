const  pool =  require('../config/database')

// avoir tout les adherents 
exports.toutAdherent  =  async (req, res, next) =>{
try{
    const result  =  await pool.query('select  *from adherents order by id asc');
    res.json(result.rows)
}
catch(err){
    next(err);
}
}

//ajouter un adherents

exports.ajouteAdherents = async (req, res, next)=>{
try{
    const {nom , contact} = req.body;
    if( !nom || !contact ){
        return res.status(400).json({message : 'le nom et le contact sont obligatoire'});
    }
    const  result   =  await pool.query(' insert into adherents (nom , contact) values ($1, $2) ', [nom, contact])
    res.status(201).json(result.rows[0])
}catch(err){
    next(err)
}
}

//obtenir par son id 
exports.adherentsId =  async (req, res ,next) =>{
    try{
        const {id} =  req.params;
        const result  =  await pool.query('select *from adherents where id = $1', [id])
        if(result.rows.length === 0){
            res.status(404).json({msg :  'adherent non trouvé'});
        }

        //recuperations de l'historique des emprunt 
        const emprunts = await pool.query('select  emprunts.id, livres.titre, emprunts.date_retour_prevue, emprunts.date_retour_effective from emprunts join livres on  emprunts.livre_id = livres.id  whrere emprunts.adherents_id = $1 order by emprunts.date_emprunt DESC', [id])
    res.json({...result.rows, historique : emprunts.rows})
    }catch(err){
        next(err)
    }
}



//modification d'un adherent
exports.modifieAderents = async (req, res, next)=>{
try{
const {id} = req.params;
const {nom, contact} = req.body;

const result =  await pool.query('update adherents nom = $1,  contact  = $2  where = $3', [nom,  contact, id])
if(result.rows.length ===0){
    return res.status(404).json({message :  'pas de adherent'})
}
res.status(200).json(rows[0]);
}
catch(err){
next(err)
}
}
//supression des adherents

exports.supprimerAderents =  async  (res,  req , next)=>{
    try{
        const {id} = req.params;
    const  result  = await pool.query('delete from adherents where id  =$1', [id])
    if(result.rows.length === 0){
        res.status(404).json({message : 'adherents non trouvé'});
    }
    res.json({message :' adhérents suprrimé '});
    }catch(err){
        next(err)
    }
}
