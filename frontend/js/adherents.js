
document.addEventListener('DOMContentLoaded',  ()=>{
    chargerAdherents();

    const form =  document.getElementById('form-adherents');
    if(form){
        form.addEventListener('submit', async(e)=>{
            e.preventDefault();

            const nom = document.getElementById('nom').value;
            const email =  document.getElementById('contact').value;

            try{
                await request('/adherents', {
                    method : 'POST',
                    body: JSON.stringify({nom : nom,
                         contact : email})
                })
                form.reset();
                chargerAdherents();
            }catch(err){
                console.error(err);
                
            }
        })
    }
})

async function chargerAdherents(){
    try{
        const adherents = await request('/adherents');
        const liste = document.getElementById('liste-adherents');
        
        if(!liste) return;

        liste.innerHTML = '';
        if(!Array.isArray(adherents) || adherents.length ===0 ){
            liste.innerHTML = '<li>auncun adherent enregistré</li>';
            return
        }

        adherents.forEach(a=>{
            const li =  document.createElement('li');
            li.textContent = `${a.nom} (${a.contact})`;
            liste.appendChild(li);
        })
    }catch(error){
        console.error(error);
        
    }
}
