# Portfolio - Le back

Bonjour, bienvenue sur le répo du serveur de mon portfolio. Auparavant, il était unique et contenait la gestion de toutes les requêtes provenant de tous mes projets. À présent, il n'a plus que la gestion des requ$etes provenant directement du portfolio en lui-même.

Voici [le serveur](https://server.alexandre-richard.fr/) en question
Et [son répo](https://github.com/Alexandre-RICHARD/Portfolio-Back)

## Utilisation
Pour utiliser ce serveur, cloner le sur votre ordinateur et assurez-vous d'avoir node.js d'installé.
Personnellement, je suis sur la version 20, mais je pense que la 16 devrait être suffisante.
Les scripts NPM permettent :
- start : démarrer le projet
- test : exécuter les fichiers de test
- update : mettre à jour les dépendences
- prettier : formatter le code automatiquement
- lint : repérer les erreurs de formattage
- lint & fix : répérer et corriger les erreurs de formattage (à utiliser après prettier)
- build : permet de bundler le projet en un fichier unique (allegeant considérablement le poids de celui-ci)
- build-run : permet de start le fichier exécuté
- clean : permet de supprimer le build
- clean : permet de supprimer le build et tous le dossier node_modules