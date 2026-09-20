const pool  =  require('../config/database');


//obtenir les livres avec recherche et pagination 
exports.obtenirLivres =  async (req,  res ,  next )=>{

try{
const {recherche,  page  = 1, limit =  10} = req.query;
const offset=  (page-1)*limit;

let  requet =  ' select livres.id, livres.titre, auteurs.nom AS auteur_nom, livres.annee_publication,  livres.statut from livres left join auteurs on livres.auteur_id = auteurs.id';
const donnee = [];
// la recherche par titre ou auteur
if(recherche){
    requet += ` where livres.titre ILIKE $1 or auteurs.nom ILIKE $1`;
    donnee.push(`%${recherche}%`) ;
}
//ajoute de la pagination
const ora  = donnee.length+ 1 ;
const oba  = donnee.length+ 2 ;
requet += ` ORDER BY livres.id ASC LIMIT $${oba} offset $${ora}`;
donnee.push(offset, limit);

const  result  =  await pool.query(requet, donnee);
res.json(result.rows)
}
catch(error){
    next(error)
}
}
//livres par son identifiant
exports.obtenirLivreParId =  async ( req, res, next)=>{
    try{
        const {id}= req.params;
        const result  = await pool.query(` select livres.id, livres.annee_publication,  livres.statut from livres left join auteurs on livres.auteur_id = auteurs.id  where livres.id = $1`, [0])
        if(result.rows.length === 0){
            return res.status(404).json({msg : "pas de livre"});
        }
        res.json(result.rows[id]);
    }
    catch(error){
        next(error)
    }
}
//ajouter un livre

exports.ajouterLivres = async (req, res, next)=>{
    try{
        const {titre, annee_publication, auteur_id,} = req.body;
        if(!titre || !auteur_id){
            return res.status(404).json({msg : 'le titre et auteur sont obligatoir'})
        }
        const result =  await pool.query(` insert into  livres (titre, annee_publication, auteur_id) values($1, $2, $3) returning*`, [titre.trim(), annee_publication || null, auteur_id /*'dispobible' || n*/]
    );
    res.status(201).json(result.rows[0])
}
    catch(error){
        next(error)
    }
};

//modification d'un livre
exports.modifierLivre = async (req, res, next)=>{
    try{
        const {id} =req.params;
        const {titre, annee_publication, auteur_id, status} = req.body;

        const result = await pool.query(` update livres set titre = $1, annee_publication = $2,auteur_id = $3, status = $4 where id = $5 returning*`, [titre,  annee_publication, auteur_id, status, id]);
        if(result.rows.length === 0){
            return res.status(404).json({message : "livres non trouvé"});

        }
        res.json(result.rows[0]);
    }
    catch(error){
        next(error)
    }
}

// supprimer un livre

exports.supprimerLivre =  async (req, res, next)=>{
try{
const {id} = req.params;
    const  result =  await pool.query(' delete from livres where id = $1 returning*', [id]);

    if(result.rows.length === 0){
        res.status(404).json({msg :  "le livre n'a pas été trouver"})
    }
    res.json({msg : "livre supprimer"})

}catch(error){
 next(error)
}
}



//c'est chaud ==== 
