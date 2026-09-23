//fichier de base pour les autres fichier 
// l'initialisation de l'url de base

const API_URL = 'http://localhost:5000/api'
async function request(endpoint , option = {}) {
    try{
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type' : 'application/json', // informe le serveur du contenu qui sera envoyer au fromat json
                ...option.headers, // on utilise l'operateur de decompositon pour exstraire les entête
            },
            ...option, 
        })

        //const data = await response.json();
        if(response.status === 204) return null;

        const text =  await response.text();
        const data = text ? JSON.parse(text) : {};

        if(!response.ok){
            const errorTest = await response.text()
            throw new Error(errorTest || 'une erreur est survenue');
        }
        return data
    }catch(error){
        console.error(`erreur API ${endpoint}:`, error.message);
        alert(error.message)
        throw error;
    }
}