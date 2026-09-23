document.addEventListener('DOMContentLoaded', () => {
  chargerAuteurs();

  document.getElementById('form-auteur').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value;
    const nationalite = document.getElementById('nationalite').value;

    await request('/auteurs', {
      method: 'POST',
      body: JSON.stringify({ nom, nationalite })
    });

    e.target.reset();
    chargerAuteurs();
  });
});

async function chargerAuteurs() {
  const auteurs = await request('/auteurs');
  const liste = document.getElementById('Liste-auteurs');

  liste.innerHTML = '';

  // Utiliser "auteurs.forEach" et non "References"
  auteurs.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `${a.nom} (${a.nationalite || 'Inconnue'})`;
    liste.appendChild(li);
  });
}