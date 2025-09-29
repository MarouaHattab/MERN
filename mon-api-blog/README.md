# Mon API Blog - Backend Express.js

## 📋 Description du Projet

API RESTful développée avec Node.js et Express.js dans le cadre du cours MERN - Semaine 1. Ce projet pose les fondations d'une application back-end scalable suivant le principe de Séparation des Préoccupations (SoC).

![Logo Node.js](https://nodejs.org/static/images/logo.svg)

---

## 🎯 Objectifs Pédagogiques

- Concevoir une architecture back-end scalable
- Maîtriser le cycle de vie d'un projet NPM
- Construire un serveur Express avec routes GET et POST
- Comprendre le rôle des middlewares (express.json())
- Valider des endpoints d'API avec Postman
- Optimiser le flux de travail avec Nodemon

---

## 🛠️ Technologies Utilisées

- **Node.js** (Version LTS) - Environnement d'exécution JavaScript
- **Express.js** - Framework web minimaliste et flexible
- **Nodemon** - Outil de développement pour auto-reload
- **Postman** - Test et documentation d'API

---

## 📁 Structure du Projet (Vision Cible)

```
mon-api-blog/
├── node_modules/       # Dépendances installées par npm
├── config/             # Fichiers de configuration (ex: connexion BDD)
├── controllers/        # Logique métier
├── models/             # Schémas de données
├── routes/             # Définition des endpoints
├── .env                # Variables d'environnement
├── .gitignore          # Fichiers à ignorer par Git
├── package.json        # Manifeste du projet
└── server.js           # Point d'entrée de l'application
```

---

## 🚀 Installation et Configuration

### 1. Prérequis

Installer Node.js (Version LTS) et vérifier l'installation :

```bash
node -v
npm -v
```

### 2. Initialisation du Projet

```bash
mkdir mon-api-blog
cd mon-api-blog
npm init -y
```

### 3. Installation des Dépendances

```bash
# Express - Framework pour créer le serveur et gérer les routes
npm install express

# Nodemon - Relance automatiquement le serveur à chaque modification
npm install nodemon --save-dev
```

### 4. Configuration des Scripts NPM

Modifier `package.json` :

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

**Pourquoi ces scripts ?**

- `start` : Mode production (sans auto-reload)
- `dev` : Mode développement avec Nodemon

---

## 💻 Code Complet du Serveur

Créer le fichier `server.js` à la racine :

```javascript
// --- Importation du module Express ---
const express = require("express");

// --- Création de l'application Express ---
const app = express();

// --- Définition du port d'écoute ---
const PORT = 3000;

// ============================================
// MIDDLEWARE
// ============================================

// --- Middleware pour parser le JSON ---
// Ce middleware permet de lire le corps (body) des requêtes POST/PUT au format JSON
// Il transforme le JSON reçu en objet JavaScript accessible via req.body
// IMPORTANT : Doit être placé AVANT la définition des routes POST
app.use(express.json());

// ============================================
// ROUTES GET
// ============================================

// --- Route racine (Page d'accueil) ---
// URL : http://localhost:3000/
// Méthode : GET
// Réponse : HTML simple
app.get("/", (req, res) => {
  res.status(200).send("<h1>Page d'accueil de notre API de Blog !</h1>");
});

// --- Route de test de l'API ---
// URL : http://localhost:3000/api/test
// Méthode : GET
// Réponse : JSON avec message de confirmation
app.get("/api/test", (req, res) => {
  res.status(200).json({
    message: "Le test a fonctionné !",
    success: true,
  });
});

// --- Route "À propos" ---
// URL : http://localhost:3000/about
// Méthode : GET
// Réponse : Informations sur l'API au format JSON
app.get("/about", (req, res) => {
  res.status(200).json({
    app: "API de blog",
    version: "1.0.0",
    description: "API simple pour Atelier MERN",
  });
});

// --- Route pour récupérer les utilisateurs ---
// URL : http://localhost:3000/api/users
// Méthode : GET
// Réponse : Liste d'utilisateurs factices au format JSON
app.get("/api/users", (req, res) => {
  // Tableau d'utilisateurs fictifs (simule une base de données)
  const users = [
    { id: 1, nom: "Maroua", email: "maroua@gmail.com" },
    { id: 2, nom: "Sarra", email: "sarra@gmail.com" },
    { id: 3, nom: "Ahmed", email: "ahmed@gmail.com" },
  ];

  // Envoi de la réponse avec statut 200 (OK)
  res.status(200).json({
    count: users.length, // Nombre d'utilisateurs
    users: users,
  });
});

// ============================================
// ROUTES POST
// ============================================

// --- Route pour créer un article ---
// URL : http://localhost:3000/api/articles
// Méthode : POST
// Body attendu : { "title": "...", "content": "...", "author": "..." }
// Réponse : Article créé avec un ID généré
app.post("/api/articles", (req, res) => {
  // Récupération des données envoyées dans le corps de la requête
  const articleData = req.body;

  // Affichage dans la console du serveur (utile pour le débogage)
  console.log("Données reçues :", articleData);

  // Simulation de la création d'un article avec un ID unique basé sur le timestamp
  res.status(201).json({
    message: "Article créé avec succès !",
    article: {
      id: Date.now(), // Génère un ID unique basé sur le temps actuel
      ...articleData, // Spread operator : copie toutes les propriétés de articleData
    },
  });
});

// ============================================
// ROUTE CONTACT - VERSION NORMALE
// ============================================

// --- Route contact (Version Simple) ---
// URL : http://localhost:3000/contact
// Méthode : POST
// Body attendu : { "email": "...", "message": "..." }
app.post("/contact", (req, res) => {
  // Récupération des données du formulaire de contact
  const contactData = req.body;
  const email = contactData.email;
  const message = contactData.message;

  // Envoi de la réponse de confirmation
  res.status(200).json({
    message: `Message reçu de ${email} : ${message}`,
  });
});

// ============================================
// ROUTE CONTACT - VERSION AMÉLIORÉE (Alternative)
// ============================================

/*
// --- Route contact (Version Améliorée avec Validation) ---
// Décommentez cette version pour remplacer la version simple ci-dessus
app.post('/contact', (req, res) => {
    // Déstructuration : extraction directe des propriétés email et message
    const { email, message } = req.body;
    
    // Validation des données reçues
    if (!email || !message) {
        // Si email ou message est manquant, retourne une erreur 400 (Bad Request)
        return res.status(400).json({ 
            error: 'Email et message sont requis',
            success: false
        });
    }
    
    // Validation basique du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: 'Format d\'email invalide',
            success: false
        });
    }
    
    // Vérification de la longueur minimale du message
    if (message.length < 10) {
        return res.status(400).json({ 
            error: 'Le message doit contenir au moins 10 caractères',
            success: false
        });
    }
    
    // Si toutes les validations passent, envoi de la réponse de succès
    console.log(`Nouveau message de contact reçu de ${email}`);
    
    res.status(200).json({
        message: `Message reçu de ${email} : ${message}`,
        success: true,
        receivedAt: new Date().toISOString()  // Horodatage de la réception
    });
});
*/

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

// --- Lancement du serveur sur le port défini ---
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
```

---

## ▶️ Lancement du Serveur

### Mode Développement (avec auto-reload)

```bash
npm run dev
```

**Sortie attendue :**

```
`Serveur démarré sur http://localhost:3000`
```

### Mode Production

```bash
npm start
```

---

## 🧪 Test des Endpoints avec Postman

### 📍 Routes GET

#### 1. Route Racine `/`

- **URL** : `http://localhost:3000/`
- **Méthode** : GET
- **Réponse** : HTML (page d'accueil)

```html
<h1>Page d'accueil de notre API de Blog !</h1>
```

![Route Racine](/img/routeracine.png)

#### 2. Route Test `/api/test`

- **URL** : `http://localhost:3000/api/test`
- **Méthode** : GET
- **Réponse** : JSON

```json
{
  "message": "Le test a fonctionné !",
  "success": true
}
```

![Route Test](/img/routetest.png)

#### 3. Route À Propos `/about`

- **URL** : `http://localhost:3000/about`
- **Méthode** : GET
- **Réponse** : JSON

```json
{
  "app": "API de blog",
  "version": "1.0.0",
  "description": "API simple pour Atelier MERN"
}
```

![Route About](/img/routeabout.png)

#### 4. Route Utilisateurs `/api/users`

- **URL** : `http://localhost:3000/api/users`
- **Méthode** : GET
- **Réponse** : JSON

```json
{
  "count": 3,
  "users": [
    { "id": 1, "nom": "Maroua", "email": "maroua@gmail.com" },
    { "id": 2, "nom": "Sarra", "email": "sarra@gmail.com" },
    { "id": 3, "nom": "Ahmed", "email": "ahmed@gmail.com" }
  ]
}
```

## ![Route Users](/img/routeusers.png)

### 📮 Routes POST

#### 1. Créer un Article `/api/articles`

- **URL** : `http://localhost:3000/api/articles`
- **Méthode** : POST
- **Headers** : `Content-Type: application/json`
- **Body (raw JSON)** :

```json
{
  "title": "Mon premier article",
  "content": "Ceci est le contenu de mon article."
}
```

- **Réponse attendue** : Status 201 Created

```json
{
  "message": "Article créé avec succès !",
  "article": {
    "id": 1759182658631,
    "title": "Mon premier article",
    "content": "Ceci est le contenu de mon article."
  }
}
```

![Route Articles](/img/routearticles.png)

#### 2. Envoyer un Message de Contact `/contact` (Version Normale)

- **URL** : `http://localhost:3000/contact`
- **Méthode** : POST
- **Headers** : `Content-Type: application/json`
- **Body (raw JSON)** :

```json
{
  "email": "test@example.com",
  "message": "Bonjour, ceci est un message de test"
}
```

- **Réponse attendue** : Status 200 OK

```json
{
  "message": "Message reçu de test@example.com : Bonjour, ceci est un message de test"
}
```

![Route Contact](/img/routecontact.png)

#### 3. Envoyer un Message de Contact `/contact` (Version Améliorée)

**Cas de succès :**

```json
{
  "email": "test@example.com",
  "message": "Ceci est un message valide avec plus de 10 caractères"
}
```

**Réponse :**

```json
{
  "message": "Message reçu de test@example.com : Ceci est un message valide avec plus de 10 caractères",
  "success": true,
  "receivedAt": "2025-09-29T10:30:00.000Z"
}
```

![Route Contact Améliorée](/img/routecontactamelioree.png)

**Cas d'erreur (email manquant) :**

```json
{
  "message": "Test sans email"
}
```

**Réponse :** Status 400 Bad Request

```json
{
  "error": "Email et message sont requis",
  "success": false
}
```

![Route Contact Erreur](/img/routecontacterreur.png)

**Cas d'erreur (format email invalide) :**

```json
{
  "email": "email-invalide",
  "message": "Message de test"
}
```

**Réponse :** Status 400 Bad Request

```json
{
  "error": "Format d'email invalide",
  "success": false
}
```

![Route Contact Email Invalide](/img/routecontactemailinvalide.png)

**Cas d'erreur (message trop court) :**

```json
{
  "email": "test@example.com",
  "message": "Court"
}
```

**Réponse :** Status 400 Bad Request

```json
{
  "error": "Le message doit contenir au moins 10 caractères",
  "success": false
}
```

![Route Contact Message Court](/img/routecontactmessagecourt.png)

---

## 📊 Codes Status HTTP Utilisés

| Code    | Signification         | Utilisation dans le projet                          |
| ------- | --------------------- | --------------------------------------------------- |
| **200** | OK                    | Requête GET réussie, message de contact reçu        |
| **201** | Created               | Article créé avec succès                            |
| **400** | Bad Request           | Données manquantes ou invalides (version améliorée) |
| **404** | Not Found             | Route inexistante                                   |
| **500** | Internal Server Error | Erreur serveur                                      |

---

## 🔑 Concepts Clés Expliqués

### Express.js

Framework qui simplifie la création de serveurs HTTP et la gestion des routes. Alternative élégante au module `http` natif de Node.js.

**Pourquoi Express ?**

- Syntaxe simple et lisible
- Système de routing puissant
- Support des middlewares
- Large écosystème de plugins

### Middleware `express.json()`

Permet de parser automatiquement le corps des requêtes JSON et de les rendre accessibles via `req.body`.

**Comment ça marche ?**

1. Client envoie : `{ "title": "Test" }`
2. Express reçoit des bytes bruts
3. `express.json()` convertit en objet JS
4. Accessible via : `req.body.title`

⚠️ **IMPORTANT** : Doit être déclaré avant les routes POST/PUT

### HTML vs JSON

| Aspect           | HTML                       | JSON                    |
| ---------------- | -------------------------- | ----------------------- |
| **Usage**        | Affichage dans navigateurs | Échange de données APIs |
| **Format**       | Langage de balisage        | Format de données       |
| **Exemple**      | `<h1>Titre</h1>`           | `{ "title": "Titre" }`  |
| **Destiné à**    | Humains (visuel)           | Machines (traitement)   |
| **Content-Type** | `text/html`                | `application/json`      |

### Nodemon

Outil de développement qui surveille les modifications de fichiers et relance automatiquement le serveur.

**Avantages :**

- ✅ Gain de temps considérable
- ✅ Pas de redémarrage manuel
- ✅ Détection automatique des changements
- ✅ Configuration simple

## 📝 Travail Pratique Réalisé

### ✅ Tâches Accomplies

1. **✅ Route "À Propos"** : `GET /about` - Retourne les infos de l'API
2. **✅ Route Utilisateurs** : `GET /api/users` - Liste d'utilisateurs factices
3. **✅ Route Contact** : `POST /contact` - Gestion des messages de contact
4. **✅ Tests Postman** : Validation de toutes les routes

### 🎯 Compétences Acquises

- Configuration d'un projet Node.js avec NPM
- Création d'un serveur Express
- Gestion des routes GET et POST
- Utilisation de middlewares
- Parsing de données JSON
- Test d'API avec Postman
- Validation de données (version améliorée)
- Gestion d'erreurs HTTP

## 📚 Ressources Utiles

- [Documentation Express.js](https://expressjs.com/)
- [Documentation Node.js](https://nodejs.org/docs/)
- [Guide Postman](https://learning.postman.com/)
- [MDN - HTTP Status Codes](https://developer.mozilla.org/fr/docs/Web/HTTP/Status)
- [NPM Documentation](https://docs.npmjs.com/)

## 📄 Licence

Ce projet est à but éducatif dans le cadre du cours MERN de l'École Polytechnique de Sousse.
