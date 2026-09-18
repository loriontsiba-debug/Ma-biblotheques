/*Nom de la base de donnéé*/
\c bibliotheque_db

/* CREATION DES TABLES*/
/* table auteurs*/
CREATE TABLE IF NOT EXISTS auteurs(
id SERIAL PRIMARY KEY,
nom VARCHAR(50) NOT NULL,
nationalite VARCHAR(50) NOT NULL
);

/* table livres*/
CREATE TABLE IF NOT EXISTS livres(
id SERIAL  PRIMARY KEY,
titre VARCHAR(100) NOT NULL,
auteur_id  INT NOT NULL,
annee_publication int NOT NULL,
statut VARCHAR(20) CHECK (statut IN ('disponible', 'indisponible')),
FOREIGN KEY (auteur_id) REFERENCES auteurs(id) ON DELETE CASCADE
);

/* table adherents*/
CREATE TABLE IF NOT EXISTS adherents(
id SERIAL  PRIMARY KEY,
nom VARCHAR(50) NOT NULL,
contact  INT NOT NULL
);


/* table emprunts*/
CREATE TABLE IF NOT EXISTS emprunts(
id SERIAL PRIMARY KEY,
adherents_id INT  NOT NULL,
livre_id  INT NOT NULL ,
date_emprunts date , 
date_retour_prevue date , 
date_retour_effective date ,
FOREIGN KEY (adherents_id) REFERENCES adherents(id) ON DELETE CASCADE,
FOREIGN KEY (livre_id) REFERENCES livres(id) ON DELETE CASCADE
);




