---

# 🏥 Medical Appointment App

Une application web/mobile moderne permettant :

- Aux **structures hospitalières** de **gérer efficacement les rendez-vous** à trois niveaux :
  - **Accueil** (réception)
  - **Médecins**
  - **Guichet de paiement**

## ✨ Fonctionnalités principales

### 👤 Patients

- Prise de rendez-vous rapide
- Interface intuitive et responsive
- Accès à son historique de rendez-vous
- Accès à une interface de suivi (pour les patients qui ont un compte)

### 🏥 Structure hospitalière

#### 📌 Vue Réception `/dashboard/reception`

- Visualiser et enregistrer les nouveaux rendez-vous
- Gérer la file d’attente
- Orienter les patients vers les médecins disponibles

#### 🩺 Vue Médecin `/dashboard/doctor`

- Consulter la liste des patients du jour
- Accéder aux fiches des patients
- Marquer les consultations comme terminées
- Une interface de consultation

#### 💳 Vue Guichet de paiement `/dashboard/reception` (ou dédiée plus tard)

- Visualiser les paiements à effectuer
- Enregistrer les paiements
- Générer les reçus

---

## 🛠️ Stack technique

- **Next.js v15** – Framework React moderne
- **Prisma** – ORM pour la base de données MySQL
- **MySQL** – Base de données relationnelle
- **TypeScript** – Typage statique
- **Tailwind CSS** – Pour le design rapide et responsive

---

## 🔧 Installation et configuration

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/ton-utilisateur/ton-repo.git
   cd ton-repo
   ```

2. **Installer les dépendances**

   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Configurer la base de données**

   Créer un fichier `.env` à la racine et ajouter :

   ```env
   DATABASE_URL="mysql://[username]:[password]@localhost:3306/[dbname]?schema=public"
   ```

4. **Initialiser Prisma**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Lancer le serveur de développement**

   ``` bash
   pnpm dev
   # ou
   npm run dev
   ```

---

## 🔐 Authentification & Accès

L’interface est divisée en 3 vues en fonction du rôle de l'utilisateur :

- `Patient` → `/dashboard/patient`
- `Médecin` → `/dashboard/doctor`
- `Réception` → `/dashboard/reception`

> Il faudra entrer manuellement le chemin d'accès car l'authentification n'est pas totalement au point
---

## 🚀 Roadmap (suggestions)

- Intégration d’un **chatbot intelligent** pour l’onboarding patient
- Ajout de **notifications par SMS/email**
- Application mobile via **React Native** ou **Expo**
- Gestion des **disponibilités médecins**
- Paiement en ligne

---
