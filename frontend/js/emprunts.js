document.addEventListener('DOMContentLoaded', ()=>{
    chargerAdherentsOption();
    chargerLivresDisponiblesOption()
    chargerEmprunts();

    const form =  document.getElementById('form-emprunt');
    if(form){
        form.addEventListener('submit', async(e)=>{
            e.preventDefault();
            const adherent_id =  document.getElementById('adherent_id').value;
            const livre_id =  document.getElementById('livre_id').value;


            try{
                await request('/emprunts', {
                    method : 'POST',
                    body: JSON.stringify({
                        adherent_id : parseInt(adherent_id),
                        livre_id : parseInt(livre_id)
                    })
                })


                form.reset()
                chargerLivresDisponiblesOption();
                chargeEmprunt();
            }catch(err){
                console.error("erreur lors de la création de l'emprunt : ", err)
            }
        })
    }
           
});
// chargement de la liste des adherents

async function chargerAdherentsOption(){
    try{
        const adherents = await request('/adherents');
        const select  =  document.getElementById('adherents_id');
        if(!select) return;

        select.innerHTML = '<option value=""> seletionner un adherent</option>';
        adherents.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id;
            option.textContent= element.nom || element.adherent_nom;
            select.appendChild(option);
        });
    }catch(err){
        console.error("erreur chargement des adherents : ", err)
    }
    
}

//chargement des livres dispo 

async function chargerLivresDisponiblesOption(){
    try{
        const livres  = await request('/livres');
        const select =  document.getElementById('livre_id')
        if(!select) return;
        
        select.innerHTML = '<option value=""> selectionner un livre disponible</option>'
        if(!Array.isArray(livres))  returns;
        //filtrons les livres disponible
    /*const disponible = livres.filter(l => !l.statut || l.statut =='disponible');

    disponible.forEach(L =>{
        const option =  document.createElement('option');
        option.value = L.id;
        option.textContent = L.titre;
        select.appendChild(option)
    })*/
    }
    catch(err){
        console.error("erreu chargement livres : ", err);
    }
}

//affichage des emprunts en cours
async function chargerEmprunts(){
    try{
        const emprunts = await request('/emprunts')
        const liste = document.getElementById('liste-emprunts');

        if(!liste) return;
        liste.innerHTML = '';

        if(!Array.isArray(emprunts) || emprunts.length === 0){
            liste.innerHTML = '<li> Aucun emprunt en cours </li>'
        }

        emprunts.forEach(emp =>{
            const li = document.createElement('li');
            li.textContent = ` livre ${emp.livre_titre || 'inconu'} | adherent : ${emp.adherent_nom || 'iconnue'} | Date : ${new Date(emp.date_emprunt).toLocaleDateString()}`;
            //btn retour
            if(!emp.date_retour){
                 const btnRetour  =document.createElement('button');
                btnRetour.textContent = 'rendre le livre';
                btnRetour.addEventListener('click', async()=>{
                await request(`/emprunt/${emp.id}/retour`, {method : 'PUT'});
                chargerLivresDisponiblesOption();
                chargerEmprunts();
            
        })
    
        liste.appendChild(li)
    
            }else{
                li.textContent += '[retour]';
            }
           liste.appendChild(li);
        
        })
    

    }

    catch(err){
        console.error('erreur chargement emprunt : ', err);
        

    }
}