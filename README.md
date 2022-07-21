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

### 0.0.1 ```1er juillet 2022```
- Création des répertoire Github

### 0.1.0 ```3 juillet 2022```
- Mise en place des premiers fichiers, test ok, prêt à coder

### 0.1.1 ```3 juillet 2022```
- Update Readme (penser à prendre l'habitude avant de push) et rajout du .env sur le .gitignore

### 0.2.0 ```4 juillet 2022```
- Commit pour un léger changement dans le Readme et pour suivre l'update front

### 0.2.1 ```4 juillet 2022```
- Petit patch, ajout d'Eslint sur le back et correction nécessaire

### 0.3.0 ```5 juillet 2022```
- Début du projet, fin de la construction du plateau d'échecs terminé.
- Tout est en javascript commun.
- Côté back : rien à part l'ajout de commande dans le package.json

### 0.4.0 ```6 juillet 2022```
- Mise en place de la base de données sans Sequelize.
- Gestion de la 1ère route getBoardData avec commande SQL simple.
- Envoi des données au front.

### 0.5.0 ```7 juillet 2022```
- Les pièces sont correctement placées sur le plateau d'échecs
- Début de lien pour récupérer les données en back pour les mouvements.
- GetBoardData changé et ajout du resetData

### 0.6.0 ```9 juillet 2022```
- Jeux d'échecs fonctionnel visuellement parlant.
- Reste encore des règles à implémenter.
- Prochaine étape, rangement, coup de propre.
- Gros progrès, grosse fierté

### 0.6.1 ```10 juillet 2022```
- Beaucoup de micro-correction, de factorisation (avec un peu de dynamisme), optimisation des appels d'API et mise en forme

### 0.6.3 ```10 juillet 2022```
- Encore un peu de factorisation et fonction unique pour la gestion des mouvements

### 0.6.4 ```12 juillet 2022```
- Tri des async/await/promise/then

### 0.6.5 ```12 juillet 2022```
- Début de la prise en compte de l'échec au roi, clouage et mise en échec du roi ok

### 0.6.6 ```13 juillet 2022```
- Le clouage est opérationnel et permet d'enlever les mouvements qui créerait un échec au roi depuis une exposition.

### 0.6.7 ```19 juillet 2022```
- Beaucoup de changement.
- Les mouvements, les pins, l'échec ne sont plus gérés et calculées à chaque "demande de gameData".
- Recharger la page faisait recalculer le tout. Maitenant, l'objet est juste envoyé mais calculer après un coup et au reset.
- La propriété "is there a piece on this case" a été supprimé, n'étant utilisé nul part. 
- Modification de la manière de construire les Readme
- Création d'un fichier de BDD secondaire pour faire des tests sans toucher à l'original
- Gestion globale et complète de l'échec au roi
- Pas mal de reformatage dans le currentMovesHandler
- Meilleure gestion de l'objet CurrentData
- Meilleure gestion des appels de fonction pour avoir moins de calcul à faire (pas encore optimal évidemment)

### 0.6.8 ```21 juillet 2022```
- Légère modification dans le ChessController pour récupérer la copie du mouvement à vérifier directement en fonction du nom de la pièce et de sa destination
- Suppression des consoles.log qui traîne
- Changement d'assignation de valeur dans le SaveMove pour qu'en cas de "pawnTransformation" la pièce enregistrée sur une case soit celle choisie