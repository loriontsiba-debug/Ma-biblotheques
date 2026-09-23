/*document.addEventListener('DOMContentLoader', async () =>{
    try{
        const data = await request('/stats');

        document.getElementById('stat-livres').textContent =  data.total_livres;
        document.getElementById('stat-adherents').textContent = data.total_adherents || data.total_Adherents;
        document.getElementById('stat-emprunts').textContent = data.emprunt_Encours || data.emprunts_en_cours;
        document.getElementById('stat-emprunts').textContent = data.emprunt_En_Retard || data.emprunts_en_retard;
    }catch(err){
        console.error('Impossible de charger les statistiques', err);
    }
});*/

document.addEventListener('DOMContentLoaded', () =>{
chargerStatistiques();
})

async function chargerStatistiques() {
    try{
const [livres, adherent, emprunts]
 = await   Promise.all([
    request('/livres'),
    request('/adherents'), 
    request('/emprunts')])
//calcul des totaus

const totallivres = Array.isArray(livres)? livres.length : 0;
const totalAdherents = Array.isArray(adherent)? adherent.length : 0;

//eprunt encour
const empruntEcours= Array.isArray(emprunts)?emprunts.filter(e => !e.date_retour).length : 0;
//emprunt en retard
const date = new Date();
date.setDate(date.getDate() -14);
const empruntEnRetard = Array.isArray(emprunts)? emprunts.filter(e=>!e.date_retour && new Date(e.date_emprunt) < date ).length : 0 ;


//mise à jour
document.getElementById('stat-livres').textContent = totallivres;
document.getElementById('stat-adherents').textContent = totalAdherents
document.getElementById('stat-emprunts').textContent = empruntEcours;
document.getElementById('stat-retards').textContent = empruntEnRetard
}
 
 catch(err){
    console.error(err);
    
    }
    
}