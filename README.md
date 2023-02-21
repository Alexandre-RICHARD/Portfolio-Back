# Portfolio - Le back

Bonjour, bienvenue sur le répo de mon portfolio. J'y ai entreposé ma présentation, mon CV, mes projets ainsi que mes contacts. Tout mes projets présentés sont hébergés sur le même site.
Il s'agit ici du back avec ci-dessous l'historique des version et leur détails.

Voici [le site](https://server.alexandre-richard.fr) en question

## Historique des version

### 0.0.1 `1er juillet 2022`

-   Création des répertoire Github

### 0.1.0 `3 juillet 2022`

-   Mise en place des premiers fichiers, test ok, prêt à coder

### 0.1.1 `3 juillet 2022`

-   Update Readme (penser à prendre l'habitude avant de push) et rajout du .env sur le .gitignore

### 0.2.0 `4 juillet 2022`

-   Commit pour un léger changement dans le Readme et pour suivre l'update front

### 0.2.1 `4 juillet 2022`

-   Petit patch, ajout d'Eslint sur le back et correction nécessaire

### 0.3.0 `5 juillet 2022`

-   Début du projet, fin de la construction du plateau d'échecs terminé.
-   Tout est en javascript commun.
-   Côté back : rien à part l'ajout de commande dans le package.json

### 0.4.0 `6 juillet 2022`

-   Mise en place de la base de données sans Sequelize.
-   Gestion de la 1ère route getBoardData avec commande SQL simple.
-   Envoi des données au front.

### 0.5.0 `7 juillet 2022`

-   Les pièces sont correctement placées sur le plateau d'échecs
-   Début de lien pour récupérer les données en back pour les mouvements.
-   GetBoardData changé et ajout du resetData

### 0.6.0 `9 juillet 2022`

-   Jeux d'échecs fonctionnel visuellement parlant.
-   Reste encore des règles à implémenter.
-   Prochaine étape, rangement, coup de propre.
-   Gros progrès, grosse fierté

### 0.6.1 `10 juillet 2022`

-   Beaucoup de micro-correction, de factorisation (avec un peu de dynamisme), optimisation des appels d'API et mise en forme

### 0.6.3 `10 juillet 2022`

-   Encore un peu de factorisation et fonction unique pour la gestion des mouvements

### 0.6.4 `12 juillet 2022`

-   Tri des async/await/promise/then

### 0.6.5 `12 juillet 2022`

-   Début de la prise en compte de l'échec au roi, clouage et mise en échec du roi ok

### 0.6.6 `13 juillet 2022`

-   Le clouage est opérationnel et permet d'enlever les mouvements qui créerait un échec au roi depuis une exposition.

### 0.6.7 `19 juillet 2022`

-   Beaucoup de changement.
-   Les mouvements, les pins, l'échec ne sont plus gérés et calculées à chaque "demande de gameData".
-   Recharger la page faisait recalculer le tout. Maitenant, l'objet est juste envoyé mais calculer après un coup et au reset.
-   La propriété "is there a piece on this case" a été supprimé, n'étant utilisé nul part.
-   Modification de la manière de construire les Readme
-   Création d'un fichier de BDD secondaire pour faire des tests sans toucher à l'original
-   Gestion globale et complète de l'échec au roi
-   Pas mal de reformatage dans le currentMovesHandler
-   Meilleure gestion de l'objet CurrentData
-   Meilleure gestion des appels de fonction pour avoir moins de calcul à faire (pas encore optimal évidemment)

### 0.6.8 `21 juillet 2022`

-   Légère modification dans le ChessController pour récupérer la copie du mouvement à vérifier directement en fonction du nom de la pièce et de sa destination
-   Suppression des consoles.log qui traîne
-   Changement d'assignation de valeur dans le SaveMove pour qu'en cas de "pawnTransformation" la pièce enregistrée sur une case soit celle choisie

### 0.6.10 `9 août 2022`

-   Suppression du fichier de création de base de données modifiés.
-   Mise en ligne du back, du front et de la base de données.

### 0.7.7 `17 août 2022`

-   Mise en forme de tous les fichiers avec prettier

### 0.9.34 `12 octobre 2022`

-   Rajout de la personnalisation de VSCode et donc mise en .gitignore du dossier .vscode
-   Mise à jour des package npm
-   Création de controller pour un total de 4 afin de séparer les usages.
-   PortfolioController pour le moment gère l'appel de la page contact qui servira à envoyer un mail depuis le formulaire de contact
-   GlobalController qui ne sert pour l'instant qu'à indiquer le bon fonctionnement du serveur via la méthode test
-   AccountController qui vient prendre en charge les requêtes liées aux connexions/inscriptions
-   ChessController qui n'a pas bougé
-   Importation dans le router et gestion des diverses route

### 0.9.36 `14 octobre 2022`

-   Petit changement dans le début de Readme pour qu'il soit conforme à celui du front et à l'évolution actuelle du projet
-   Mise en gitignore du .env
-   Changement dans la création de la connectionString pour le fichier database.js
-   Début de gestion de la connexion avec la récupération des données de formulaire ainsi que la seconde vérification en regex
-   Inscription en base de données des données d'inscription fonctionnelles mais le processus n'est pas encore le bon
-   La route test est maintenant basiquement la route sans url du server, plus logique de vérifier qu'il fonctionne de cette manière là
-   Le server n'a plus besoin de la variable PORT qui sera toujours 3000 car le serveur hébergé n'a pas besoin de cette variable
-   Le global controller contient la route / de base servant de test pour si le serveur fonctionne. Il rend l'adresse et la version du serveur
-   Supression de node-mandrill et de nodemon (ce dernier étant installé en global)
-   Dans le models ChessGame, changement dans la construction de la fonction
-   Dans le models AccountHandler, préparation de l'insertion des données en BDD

### 0.9.37 `14 octobre 2022`

-   Rajout de commande pour créer et vider un dossier .build contenant les bons fichiers à envoyer sur le serveur hébergé
-   Rajout de ce dossier en .gitignore

### 0.9.38 `15 octobre 2022`

-   Code review de tous le projet avec quelques corrections mais surtout l'identification de nombreux point à changer et à améliorer
-   Mise en commentaires des fichiers suivants (pas pour tout, uniquement les choses qui me semblaient importantes à expliquer, fonctions complexes...) :
-   Index.js
-   database.js
-   router.js
-   server.js
-   accountController.js
-   chessController.js
-   globalController.js
-   accountHandler.js
-   chessGame.js
-   Nouvelle manière de construire la connectionString, définitive cette fois (si tout va bien).
-   Changement dans le message de 404 du router.js, lorsqu'il n'a pas pu traité par une fonction la requête
-   Remise du port || 3000 dans le server.js car finalement, il pourrait être utile
-   Rajout d'un try/catch pour le getChessData dans chessController.js
-   Changement dans le message de réponse du resetBoardData dans chessController.js
-   Rajout de const et return rows dans accountHandler dans registerNewUser

### 0.9.40 `19 octobre 2022`

-   Rajout de la requête SQL pour récupérer
-   Installation de Bcryptjs pour crypter le mot de passe, version native car problème d'installation avec la version classique
-   Petite amélioration de la commande de build pour le back
-   Ajout de Code de réponse HTTP pour chaque réponse de requête
-   Correction de quelques fautes d'orthgraphe
-   Ajout d'une fonction regexTest pour l'accountController afin d'englober tous les tests
-   Finition de la fonction chargéé de gérer l'inscription. Vérification seconde des regex, prise en charge des erreurs, recherche de compte existant et renvoi de code d'erreur cohérent
-   Début de gestion de la connexion

### 0.9.41 `21 octobre 2022`

-   Ajout d'un compteur d'utilisation du serveur depuis son démarrage avec router.use
-   Changement de l'affichage dans la réponse de base du serveur servant de test. Url, version et useCounter
-   Changement du nom d'une fonction SQL
-   Mise en place des variables d'environnements du serveur hébergé sur le gestionnaire en ligne donc retrait du .env donc changement de la commande build
-   Ajout d'un "returning" dans la requête SQL de l'inscription pour recevoir les mêmes informations que lors de la connexion
-   Il n'y a plus de valeurs null par défaut pour la réponse login ou register. Maintenant, en fonction de chaque cas, une erreur est rajouté au tableau ou un tableau est envoyé directement
-   Ceci évite d'avoir à gérer le if et le else et la gestion en front est facilité avec un switch case
-   Changement de manière de détecter l'absence d'erreur et donc de continuer l'une ou l'autre fonction
-   Rajout d'un autre try catch pour la première requête SQL de register
-   Récupération des données de register grâce au "returning"
-   Finition de la méthode login avec gestion d'erreur et comparaison de mots de passe

### 0.9.42 `22 octobre 2022`

-   Changement de nom de variable. En dehors des requêtes SQL et de son fichier, la variable mail ne prendra pas de e (email), globalisé à tous le projet
-   Mise à jour des package NPM

### 0.9.43 `23 octobre 2022`

-   Rajout des deux routes pour la changement de mot de passe et d'adresse-mail
-   Finalement, tout le projet appelera la variable email en mail, pas de zone à exception
-   Dans le controller account, pour registration, simplification de la vérification de si un compte existe déjà à cette adresse
-   Dans le controller account, pour registration, l'objet result envoyé en front vient directement de la requête SQL, il n'est plus créé à la main
-   Sur la même base que les deux fonctions précédemment créées, prise en charge du changement d'informations de compte
-   Pour le changement d'adresse-mail : on vérifie les inputs, on trouve le bon compte, on compare le mot de passe, on s'assure qu'aucun compte n'existe avec la nouvelle adresse-mail et on modifie l'adresse originale
-   Pour le changement de mot de passe : on vérifie les 3 mots de passe, si pas d'erreur, on trouve le bon compte, on compare le mot de passe, on change les informations et on envoie
-   Création des 2 requêtes SQL pour la modification des infos dans la base de données

### 0.9.44 `24 octobre 2022`

-   Avec la même logique adaptée au cas présent, rajout de la route account/delete avec vérification des inputs, recherche du bon compte, comparaison de mot de passe et suppression si tout est ok
-   Rajout de la requête SQL liée

### 0.9.50 `3 novembre 2022`

-   Changement dans l'objet envoyé pour getChessGameData. Rajout d'une valeur indiquand si oui ou non, les données sont prêtes.

### 1.0.0 `15 novembre 2022`

-   Passage en 1.0 maintenant que j'ai commencé à postuler et que je pars du principe que mon objectif initial est atteind.
-   Mise à jour des package NPM

### 1.0.1 `26 décembre 2022`

-   Ajout de la route servant à vérifier le mot de passe pour les tests d'allemand
-   Ajout de la route pour gérer le compte du nombre de visite unique
-   Changement des deux routes patch en post car elles ne fonctionnaient pas en prod
-   GermanController, ce fichier sert juste à comparer le mot de passe reçu à l'aide d'un mot de passe hashé, même logique que les autres controlleurs
-   Dans le globalController, ajout de la fonction pour gérer le nombre de visite. Utilisation d'un middleware (visitCounter).
-   Si la date du jour a déjà une valeur de visite associée, alors on l'incrémente, sinon on la créée.
-   Dans AccountController, changement du nom de la table utilisée pour correspondre au nouveau nom utilisé en BDD

### 1.0.2 `29 décembre 2022`

-   Mise à jour des packages

### 1.0.5 `30 janvier 2023`

-   Mise à jour des packages

### 1.1.0 `18 février 2023`

-   Mise à jour des packages

### 1.1.4 `21 février 2023`

-   Mise à jour des packages
-   Changement de nom du projet, plus question de l'appeler tryhard but slowrun. C'est un peu nul comme nom, c'est simplement mon portfolio

### 1.1.5 `21 février 2023`

-   