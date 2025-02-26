# CoWork-Frontend

Bienvenue sur le **Frontend** de mon application **CoWork**, une application Angular créée pour faciliter la collaboration grâce à un Gestionnaire de Tâches Collaboratif.

# Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants sur votre machine :

Node.js (version 16 ou supérieure) : Télécharger [Node.js ici](https://nodejs.org/fr)

Angular CLI (Interface en ligne de commande pour Angular) :

```bash
npm install -g @angular/cli
```

# Initialisation du projet

Suivez ces étapes pour cloner et démarrer le projet sur votre machine locale :

**Clonez le projet** : Téléchargez ou clonez ce dépôt en utilisant la commande suivante :

```bash
git clone https://github.com/Tsuna21/CoWork-Backend.git
```

**Accédez au dossier du projet** :

```bash
cd Nom du dossier racine
```

**Installez les dépendances** : Installez tous les modules nécessaires avec npm :

```bash
npm install
```

**Lancez le projet** : Démarrez le serveur de développement Angular avec :

```bash
ng serve
```

**Accédez à l'application dans votre navigateur** : Ouvrez votre navigateur et allez à l'adresse suivante :

http://localhost:4200

# Commandes principales

Voici les commandes les plus importantes pour travailler avec ce projet :

**Démarrer le serveur de développement** :

```bash
ng serve
```

Cela lance l'application sur http://localhost:4200.

**Construire le projet pour la production** :

```bash
ng build --prod
```

Génère les fichiers optimisés pour un déploiement.

**Créer un nouveau composant** :

```bash
ng generate component <nom-du-composant>
```

**Mettre à jour Angular** :

```bash
ng update @angular/cli @angular/core
```

* **Construire image docker :**
    ```bash
    docker build . --tag cowork-frontend:$(date +%s)
    ```

# Structure du projet

Voici les dossiers et fichiers principaux du projet :

**src/app** : Contient tout le code de l'application Angular.

**app.module.ts** : Le fichier principal qui configure l'application et charge les composants.

**app.component.ts** : Le composant principal de l'application.

**app-routing.module.ts** : Gère les routes pour naviguer entre différentes pages.

**angular.json** : Configuration du projet Angular.

**package.json** : Liste des dépendances du projet.

**node_modules/** : Contient toutes les bibliothèques installées via npm (automatiquement généré).

# Dépendances importantes

Voici quelques-unes des dépendances principales utilisées dans ce projet :

**@angular/core** : Framework principal d'Angular.

**@angular/router** : Gestion des routes et navigation dans l'application.

**TypeScript** : Langage utilisé pour coder en Angular.

**RxJS** : Librairie pour gérer les flux de données asynchrones.

# FAQ

**Que faire si ng serve ne fonctionne pas ?**

1 - Assurez-vous que toutes les dépendances sont installées avec npm install.

2 - Vérifiez que vous utilisez la bonne version de Node.js et Angular CLI.

3 - Consultez les logs pour toute erreur et suivez les instructions pour les corriger.

# Ressources Utiles

Voici quelques ressources pour approfondir vos connaissances sur Angular :

* [Guide Angular (officiel)](https://angular.io/docs)
* [Documentation de l'Angular CLI](https://angular.io/cli)
* [Documentation TypeScript](https://www.typescriptlang.org/docs/)
* [Documentation Node.js](https://nodejs.org)

# Auteur

Ce projet a été créé dans le cadre d'un stage sur Angular.
