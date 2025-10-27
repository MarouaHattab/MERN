# MERN TP5 - API de Gestion de Cours

API RESTful pour la gestion d'utilisateurs, de profils, de cours et de critiques avec des relations MongoDB.

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env` à la racine du projet :

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/mern_tp5
NODE_ENV=development
```

## Démarrage

```bash
# Mode développement avec nodemon
npm run dev

# Mode production
npm start
```

## Points de Terminaison (Endpoints)

### 1. Gestion des Utilisateurs

#### POST /api/users

Crée un utilisateur.

**Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Réponse (201):**

```json
{
  "_id": "...",
  "username": "john_doe",
  "email": "john@example.com",
  "courses": []
}
```

#### GET /api/users

Récupère tous les utilisateurs.

**Réponse (200):**

```json
[
  {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "courses": [...]
  }
]
```

#### GET /api/users/:id

Récupère un utilisateur par son ID.

**Réponse (200):**

```json
{
  "_id": "...",
  "username": "john_doe",
  "email": "john@example.com",
  "courses": [...]
}
```

---

### 2. Gestion des Profils (Relation 1-to-1)

#### POST /api/users/:userId/profile

Crée un profil pour un utilisateur.

**Body:**

```json
{
  "bio": "Développeur passionné",
  "website": "https://johndoe.com"
}
```

**Réponse (201):**

```json
{
  "_id": "...",
  "user": "userId",
  "bio": "Développeur passionné",
  "website": "https://johndoe.com"
}
```

#### GET /api/users/:userId/profile

Récupère le profil d'un utilisateur.

**Réponse (200):**

```json
{
  "_id": "...",
  "user": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "bio": "Développeur passionné",
  "website": "https://johndoe.com"
}
```

#### PUT /api/users/:userId/profile

Met à jour le profil d'un utilisateur.

**Body:**

```json
{
  "bio": "Nouvelle bio",
  "website": "https://newwebsite.com"
}
```

---

### 3. Gestion des Cours

#### POST /api/courses

Crée un cours.

**Body:**

```json
{
  "title": "Introduction à Node.js",
  "description": "Apprenez les bases de Node.js",
  "instructor": "Jane Smith"
}
```

**Réponse (201):**

```json
{
  "_id": "...",
  "title": "Introduction à Node.js",
  "description": "Apprenez les bases de Node.js",
  "instructor": "Jane Smith",
  "students": []
}
```

#### GET /api/courses

Récupère tous les cours.

**Réponse (200):**

```json
[
  {
    "_id": "...",
    "title": "Introduction à Node.js",
    "description": "Apprenez les bases de Node.js",
    "instructor": "Jane Smith",
    "students": [...]
  }
]
```

#### GET /api/courses/:id

Récupère un cours par son ID.

---

### 4. Gestion des Inscriptions (Relation Many-to-Many)

#### POST /api/courses/:courseId/enroll

Inscrit un utilisateur à un cours.

**Body:**

```json
{
  "userId": "user_id_here"
}
```

**Réponse (200):**

```json
{
  "message": "Inscription réussie."
}
```

#### GET /api/courses/:courseId/students

Récupère la liste des étudiants inscrits à un cours.

**Réponse (200):**

```json
[
  {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com"
  }
]
```

#### GET /api/users/:userId/courses

Récupère la liste des cours auxquels un utilisateur est inscrit.

**Réponse (200):**

```json
[
  {
    "_id": "...",
    "title": "Introduction à Node.js",
    "description": "Apprenez les bases de Node.js",
    "instructor": "Jane Smith"
  }
]
```

---

### 5. Gestion des Critiques (Relation 1-to-Many)

#### POST /api/courses/:courseId/reviews

Ajoute une critique à un cours.

**Body:**

```json
{
  "rating": 5,
  "comment": "Excellent cours !",
  "userId": "user_id_here"
}
```

**Réponse (201):**

```json
{
  "_id": "...",
  "rating": 5,
  "comment": "Excellent cours !",
  "course": "courseId",
  "user": "userId"
}
```

#### GET /api/courses/:courseId/reviews

Récupère toutes les critiques d'un cours.

**Réponse (200):**

```json
[
  {
    "_id": "...",
    "rating": 5,
    "comment": "Excellent cours !",
    "user": {
      "_id": "...",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "course": {
      "_id": "...",
      "title": "Introduction à Node.js"
    }
  }
]
```

---

## Structure du Projet

```
TP5/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   ├── profileController.js
│   ├── courseController.js
│   └── reviewController.js
├── middleware/
│   ├── asyncHandler.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Profile.js
│   ├── Course.js
│   └── Review.js
├── routes/
│   ├── userRoutes.js
│   └── courseRoutes.js
├── .env
├── package.json
└── server.js
```

## Relations MongoDB

- **1-to-1**: User ↔ Profile
- **Many-to-Many**: User ↔ Course (via tableaux `courses` et `students`)
- **1-to-Many**: Course → Reviews

## Technologies Utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
