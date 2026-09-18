// valider la creation d'un auteur

const { json } = require("express");

exports.validerAuteur = (req, res, next)=>{
    const {nom} = req.body;
    if(!nom){
        res.status(400).json({msg : "le nom de l'auteur est obligatoire"})
    }
    next();
}

// valider un emprunt

exports.valideEmprunt =  (req, res, next)=>{
    const{ livre_id, adherent_id, date_retour_prevue} = req.body;

    if(!livre_id || !adherent_id || !date_retour_prevue){
        return res.status(400).json({
            msg : "les champs livre_id, adherent_id et date_retour_prevue sont obligé"
        })
    }

    //verifions  que la date est valide 
    const datePrevue = new Date(date_retour_prevue);
    if(isNaN(datePrevue.getTime())){
        return res.status(400).json({msg : "la date de retour n'est valide"})
    }
    next()
}