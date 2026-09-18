const pool = require('../config/database')
          //LA LOGIQUE METIER// 

// on va voir les emprunts(on va utiliser les filtre possible "en_cours" ou "en_retard")

exports.voirEmprunt = async  (req, res , next)=>{
    try{
        const {filtre} =req.query; //elle nous permet de filtrer 
        
        let query =` select emprunts.id, emprunts.date_retour_prevue, emprunts.date_retour_effective, livres.id as livre_id, livres.titre as livre_titre,
        adherents.id as adherents_id,  adherents.nom as adherents_nom
        from emprunts join livres on emprunts.livre_id = livres.id
        join adherents on emprunts.adherents_id = adherents.id`;

        if(filtre === 'en_cours'){
            query += ` WHERE emprunts.date_retour_effective is null`;
        }else if(filtre ==='en_retard'){
            query +=` WHERE emprunts.date_retour_effective is null  and emprunts.date_retour_prevue <current_date`; 
        }
           query += ` ORDER BY emprunts.date_retour_effective DESC`;

        const result = await  pool.query(query);
        res.json(result.rows)
    }
    catch(error){
        next(error);
    }

};

//enregistrement  d'un nouvel emprunt

exports.ajoutEmprunt =  async (req, res, next)=>{
   const client  =  await pool.connect();
   try{
    const {livre_id, adherents_id, date_retour_prevue} = req.body;

    if(!livre_id || !adherents_id || !date_retour_prevue){
        return res.status(400).json({msg : "le livre, l'adherents et la date son requis"});
    }

    //utilisation des transactions
    await client.query('begin'); // debut de la transaction

    //verification de la disponibilité

    const livreCheck = await client.query('select statut from livres where id')

    if(livreCheck.rows.length === 0){
        await client.query(rollback);
        return res.status(404).json({msg : 'livre introuvable'});
    }

    //on va creer un emprunt 
    const creerEmpunt = await client.query(`insert into  emprunts(livre_id, adherent_id, date_retour_prevue)
    values ($1, $2, $3)  returning *`, 
    [livre_id, adherents_id])

//mise à jour du status
   await client.query(`update livres set statut = 'emprunt' where id = $1`,['emprunte', livre_id])

   await client.query('COMMIT');
   res.status(201).json(creerEmpunt.rows[0]);
   }
   catch(error){
    await client.query('rollback');
    next(error)
   }finally{
    client.release();
   }

}

//enregistré le retour d'un livre
exports.retourEmprunt = async (req, res, next)=>{
const client = await pool.connect();
try{
const {id} = req.params;

await client.query('BEGIN');
//recuppreration de l'emprunt pour trouver le livre associé

const  empruntResult = await client.query('select livre_id,  date_retour_effective from emprunts where id = $1', [id]);

if(empruntResult.rows.length === 0){
    await client.query('rollback');
    return res.status(404).json({mgs : "emprunt introuvable"});
}

if(empruntResult.rows[0].date_retour_affective !== null){
    await client.query('ROLLBACK');
    return res.status(400).json({msg : 'ce livre à été rendu'});
}


const livre_id = empruntResult.rows[0].livre_id;
//on marque l'emprunt comme rendu 
await client.query(`update emprunts set date_retour_effective = current_date where id = $1`, [livre_id]);
//reppasons le satus sur disponible
await client.query('COMMIT');
res.json({msg : "livres rendu avec sucecès"});


}catch(error){
await client.query('ROLLBACK');
next(error)
}    
finally{
    client.release()
}
}


