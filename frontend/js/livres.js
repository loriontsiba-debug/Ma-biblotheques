document.addEventListener('DOMContentLoaded', ()=>{
    chargerAuteursOption();
    chargerLivres();

    //on soumet le formulaire
    const form = document.getElementById('form-livre')

    if(form){
        form.addEventListener('submit', async (e)=>{
             e.preventDefault();

            const titre = document.getElementById('titre').value;
            const annee_publication = document.getElementById('annee-publication').value;
            const auteur_id = document.getElementById('auteur_id').value;

            await request('/livres', {
                method : 'POST',
                Headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({
                    titre,
                    annee_publication: annee_publication? parseInt (annee_publication) : null,
                    auteur_id : parseInt(auteur_id)
                })
            })
            form.reset();
            chargerLivres();
        })
    }
    //recherche
const btnRecherche = document.getElementById('btn-recherche');
if(btnRecherche){
    btnRecherche.addEventListener('click', ()=>{
        const terme = document.getElementById('recherche').value;
        chargerLivres(terme);
        
    })
}

})



// charger les auteurs dans le menu déroulant <
async function chargerAuteursOption() {
    try{
        const auteur = await request('/auteurs');
        const select  = document.getElementById('auteur_id');

        if(!select)return;
        auteur.forEach(element => {
            const option = document.createElement('option');
            option.value= element.id;
            option.textContent = element.nom;

            select.appendChild(option)
        });
    }catch(err){
        console.error("Erreur lors  du chargement des auteurs :", err)
    }
    
}

// chargeent et affichage de la liste des livres

async function chargerLivres( recherche = ''){
    try{
        const endpoint =  recherche ? `/livres?recherche=${encodeURIComponent(recherche)}`: '/livres';
        const livres = await request('/livres');
        const liste = document.getElementById('liste-livres');

        if(!liste) return;
        liste.innerHTML = '';

        if(livres.length === 0){
            liste.innerHTML  = '<li> Aucun livre trouvé</l>';
            return;
        }
        livres.forEach(L =>{
            const li = document.createElement('li')
            liste.textContent =  `${L.titre} (${L.annee_publication}) - auteur : ${L.auteur_nom || inconnu } [Status : ${L.statut}] `;
            liste.appendChild(li)
        })
    }catch(err){
        console.error(err);
        
    }
}