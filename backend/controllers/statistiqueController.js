const pool = require('../config/database')

exports.statDashboard = async(req, res, next)=>{
    try{
        //nombre de livres
        const totallivres = await pool.query('select count(*) from livres')
        //nombre total d'adherents
        const  totaAdherents = await pool.query('select count(*) from adherents')
        //total emprunts en cours
        const empruntEncours = await pool.query('select count(*) from emprunts where date_retour_effective is null');
         //total d'emprunts en retard
        const  empruntsEnRetard = await pool.query(
            'select count(*) from emprunts where date_retour_effective is null and date_retour_prevue <current_date'
        );
        //livre le plus empunté
        const livrePlusEmprunt = await pool.query(`select livres.titre, count(emprunts.id) as nb_emprunts
        from emprunts
        join livres on emprunts.livre_id = livres.id
        GROUP BY livres.id, livres.titre
        ORDER BY nb_emprunts DESC
        LIMIT 1`)
        //adherent le plus actif
        const adherentPlusActif = await pool.query(`select adherents.nom,  count(emprunts.id) as nb_adherents
        from emprunts 
        JOIN adherents on emprunts.adherents_id = adherents.id
        GROUP BY adherents.id, adherents.nom
        ORDER BY nb_adherents DESC
        LIMIT 1`);

        res.json({
            total_livres: parseInt(totallivres.rows[0].count),
            total_Adherents: parseInt(totaAdherents.rows[0].count),
            emprunt_Encours: parseInt(empruntEncours.rows[0].count),
            livre_Plus_Emprunt: livrePlusEmprunt.rows[0] || null,
            emprunts_En_Retard :parseInt(empruntsEnRetard.rows[0].count),
            adherent_Plus_Actif: adherentPlusActif.rows[0] || null,

        })



    }catch(error){
        next(error)
    }
}