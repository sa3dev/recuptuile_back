# # Recuptuile | Back

## Stack technique

- `typescript` pour la transpilation en js 
- `express` pour la partie serveur web
- `knex` pour la partie connexion et interrogation de la base de données. 

## Lancement du projet

- Renommer ou copier le fichier `.env.sample` en `.env` et renseigner les variables
- Lancement en mode `dev` via la commande `npm run start:dev`
- Build du projet via la commande `npm run build`

## Organisation

- `server` : routing relatif à chaque entité
- `index.ts` : point d'entrée de l'application
- `controllers` : controlleurs gérant les requêtes http
- `services` : couche relative à la persistance des données
- `lib` : helpers, connecteur à la base de données...