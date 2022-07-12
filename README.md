# TryHard but SlowRun - Le back

## Installation (classique) :

<details>
<summary>Développer</summary>

  **1 : Création de la BDD** 
  - `sudo -i -u postgres;` sur Ubuntu ou  `psql -U postgres` sur Windows
  - `CREATE ROLE chess WITH LOGIN PASSWORD 'chess';`
  - `CREATE DATABASE chess OWNER chess;`
    
  **2 : Sur un autre terminal**
  - `psql -U chess -d chess -f ./data/create_db.sql;'
  -  MDP `chess`

  **3 : Créer le .env**
  - À l'intérieur du .env, mettre : 
  - `PG_URL=postgresql://chess:chess@localhost:5432/chess`
  - `PORT=3000`

Et voilà 

</details>

## Historique des version
0.0.1 - Création des répertoire Github
0.1.0 - Mise en place des premiers fichiers, test ok, prêt à coder
0.1.1 - Update Readme (penser à prendre l'habitude avant de push) et rajout du .env sur le .gitignore
0.2.0 - Commit pour un léger changement dans le Readme et pour suivre l'update front
0.2.1 - Petit patch, ajout d'Eslint sur le back et correction nécessaire
0.3.0 - Début du projet, fin de la construction du plateau d'échecs terminé. Tout est en javascript commun. Côté back : rien à part l'ajout de commande dans le package.json
0.4.0 - Mise en place de la base de données sans Sequelize. GEstion de la 1ère route getBoardData avec commande SQL simple. Envoi des données au front.
0.5.0 - Les pièces sont correctement placées sur le plateau d'échecs, début de lien pour récupérer les données en back pour les mouvements. GetBoardData changé et ajout du resetData
0.6.0 - Jeux d'échecs fonctionnel visuellement parlant. Reste encore des règles à implémenter. Prochaine étape, rangement, coup de propre. Gros progrès, grosse fierté
0.6.1 - Beaucoup de micro-correction, de factorisation (avec un peu de dynamisme), optimisation des appels d'API et mise en forme
0.6.3 - Encore un peu de factorisation et fonction unique pour la gestion des mouvements
0.6.4 - Tri des async/await/promise/then