# AtlasVault - Spécification des Pages Manquantes

## Vue d'ensemble du projet
**Plateforme:** MarketPlace numérique tunisienne pour les services (streaming, télécom, gaming, business)
**Couleurs:**
- Primaire: Sidi Bou Cobalt (#0066CC)
- Accent: Horizon Sky (#4A90E2)
- Succès: Emerald Mint (#2ECC71)
- Texte: Deep Indigo (#1A2B48)
- Base: Mediterranean White (#FFFFFF)

---

## Pages Existantes Actuelles
✅ `/` - Homepage (landing page avec 4 catégories)
✅ `/products` - Catalogue de produits par catégorie
✅ `/login` - Connexion utilisateur
✅ `/signup` - Inscription utilisateur
✅ `/cart` - Panier d'achat
✅ `/checkout/[orderId]` - Page de paiement
✅ `/order-confirmation/[orderId]` - Confirmation de commande
✅ `/dashboard` - Tableau de bord utilisateur

---

## Pages Manquantes à Développer

### 1. PAGE D'ERREUR 404 - `/app/not-found.tsx`

#### Fonctionnalité
- Afficher un message d'erreur lorsque l'utilisateur accède à une URL inexistante
- Redirection facile vers l'accueil ou les produits

#### Contenu Essentiel
- Titre: "Page non trouvée"
- Message explicatif
- Illustration ou icône appropriée
- Boutons d'action: "Retour à l'accueil" et "Voir les produits"

#### Design
- Utiliser le dégradé primaire du site
- Icône grande et visible (ErrorIcon ou similaire)
- Layout centré et minimaliste
- Couleurs: Primaire (#0066CC) + base blanche

#### UI/UX
- Page responsive mobile-first
- Message clair et amical
- Boutons cliquables avec hover effects

---

### 2. PAGE 500 - `/app/error.tsx`

#### Fonctionnalité
- Gérer les erreurs serveur/500
- Afficher un message d'erreur sans révéler les détails techniques
- Permettre à l'utilisateur de réessayer ou retourner à l'accueil

#### Contenu Essentiel
- Titre: "Une erreur s'est produite"
- Message amical
- Boutons: "Réessayer", "Retour à l'accueil"
- Option de contact support

#### Design
- Utiliser les couleurs de destructive (#EF4444) pour l'alerte
- Icône d'erreur visible
- Layout similaire à la page 404

---

### 3. PAGE CONDITION D'UTILISATION - `/app/terms/page.tsx`

#### Fonctionnalité
- Afficher les conditions d'utilisation
- Texte juridique complet et structuré
- Lien depuis le footer

#### Contenu Essentiel
```
1. Acceptation des conditions
2. Description du service
3. Responsabilités de l'utilisateur
4. Responsabilités d'AtlasVault
5. Propriété intellectuelle
6. Limitation de responsabilité
7. Modification des conditions
8. Droit applicable
```

#### Design
- Header avec titre et date de dernière mise à jour
- Texte organisé en sections numérotées
- Table des matières interactives (navigation par ancres)
- Couleurs neutres
- Sidebar fixe (mobile: collapsible) pour la navigation

#### UI/UX
- Lectibilité optimale (line-height 1.6)
- Navigation par sections
- Impression-friendly (pas de sticky headers lors de l'impression)

---

### 4. PAGE POLITIQUE DE CONFIDENTIALITÉ - `/app/privacy/page.tsx`

#### Fonctionnalité
- Afficher la politique de confidentialité RGPD/PDPA
- Expliquer la collecte et utilisation des données
- Informer sur les droits utilisateur

#### Contenu Essentiel
```
1. Informations collectées
2. Utilisation des données
3. Partage de données
4. Sécurité des données
5. Durée de conservation
6. Droits de l'utilisateur (RGPD)
7. Cookies et tracking
8. Contact - Responsable protection données
```

#### Design
- Layout similaire aux conditions d'utilisation
- Table des matières interactive
- Sections clairement délimitées
- Mise en évidence des points importants

#### UI/UX
- Facile à scanner
- Langage clair et compréhensible
- Formulaire de contact pour questions

---

### 5. PAGE CONTACT/SUPPORT - `/app/support/page.tsx`

#### Fonctionnalité
- Permettre aux utilisateurs de contacter le support
- Formulaire de contact avec ticket tracking
- Page FAQ intégrée
- Affichage du statut du support (online/offline)

#### Contenu Essentiel
**Section 1: FAQ**
- Questions fréquentes par catégorie (Vault, Telecom, Gaming, Business)
- Accordions pour chaque question/réponse
- Barre de recherche

**Section 2: Formulaire de Contact**
- Nom
- Email
- Catégorie (Bug, Suggestion, Paiement, etc.)
- Message
- Upload d'attachments optionnel
- Priorité (Basse/Moyenne/Haute)

**Section 3: Canaux de Contact**
- Email: support@atlasvault.tn
- Chat en direct (mock pour MVP)
- Heures de support: 8h-20h (7j/7)

#### Design
- Section FAQ en haut avec accordions
- Formulaire dans une card centralisée
- Canaux de contact avec icônes (mail, chat, phone)
- Couleur primaire pour les CTA
- Statut online/offline avec badge

#### UI/UX
- Recherche FAQ en temps réel
- Validation de formulaire inline
- Message de succès après envoi
- Formulaire responsive

#### Intégration BD
- Créer table `support_tickets`
  ```
  id, user_id, subject, category, message, 
  attachments[], priority, status, 
  created_at, updated_at, response
  ```

---

### 6. PAGE ABOUT/À PROPOS - `/app/about/page.tsx`

#### Fonctionnalité
- Présenter l'histoire et mission d'AtlasVault
- Afficher les valeurs et vision
- Team ou équipe (optionnel)
- Stats/chiffres clés

#### Contenu Essentiel
```
1. Héro: Titre + sous-titre
2. Notre Mission
3. Notre Vision
4. Pourquoi AtlasVault
5. Nos Valeurs (3-4 valeurs clés)
6. Timeline/Histoire
7. Statistiques (Utilisateurs, Commandes, etc.)
8. CTA: "Rejoindre la communauté"
```

#### Design
- Hero section attrayant avec gradient primaire
- Sections alternées avec texte/image
- Cards pour les valeurs
- Stats en grandes typographies
- Timeline visuelle (optionnel mais impactante)

#### UI/UX
- Animations au scroll (fade-in)
- Images/illustrations premium
- CTA prominent à la fin
- Responsive et mobile-friendly

---

### 7. PAGE CATÉGORIES DÉTAILLÉES - `/app/category/[slug]/page.tsx`

#### Fonctionnalité
- Page dédiée par catégorie (vault, telecom, gaming, business)
- Description détaillée de chaque catégorie
- Affichage des produits de cette catégorie
- Filtres et recherche

#### Contenu Essentiel
**Section 1: Header avec Description**
- Nom de la catégorie
- Icône/Image de la catégorie
- Description détaillée
- Avantages principaux (3-4 points)

**Section 2: Produits**
- Grid de produits (3 colonnes)
- Filtres (Prix, Note, Disponibilité)
- Pagination
- Tri (Populaire, Prix, Nouveau)

#### Design
- Header avec dégradé spécifique à la catégorie
- Cards de produits avec images
- Sidebar filtres sur desktop
- Drawer filtres sur mobile
- Coleurs cohérentes avec le site

#### UI/UX
- Filtres appliqués en temps réel
- Compteur de résultats
- Skeleton loaders pendant le chargement
- Pas de produits? Message vide avec CTA

---

### 8. PAGE DÉTAILS PRODUIT - `/app/product/[id]/page.tsx`

#### Fonctionnalité
- Affichage détaillé d'un service
- Images/galerie
- Description complète
- Avis utilisateurs
- Options d'achat

#### Contenu Essentiel
**Colonne 1 (Images)**
- Image principale grande
- Galerie miniatures
- Badge (New, Sale, Popular)

**Colonne 2 (Infos)**
- Nom du produit
- Prix (TND)
- Note et nombre d'avis
- Description courte
- Points clés (list)
- Quantité (spinner)
- Bouton "Ajouter au panier"
- Bouton "Favoris" (heart icon)

**Colonne 3 (Avis)**
- Avis utilisateurs
- Rating distribution
- Formulaire d'avis (utilisateurs connectés)

#### Design
- Layout 2-3 colonnes
- Images responsives
- Sticky "Ajouter au panier" sur mobile
- Couleur primaire pour les CTA

#### UI/UX
- Galerie d'images zoomable
- Onglets (Description, Avis, Spécifications)
- Validation avant ajout panier
- Message de confirmation

#### Intégration BD
- Créer table `product_reviews`
  ```
  id, product_id, user_id, rating, 
  comment, created_at, helpful_count
  ```

---

### 9. PAGE FAVORIS - `/app/favorites/page.tsx`

#### Fonctionnalité
- Afficher les produits favoris de l'utilisateur
- Comparaison de produits
- Gestion des favoris

#### Contenu Essentiel
- Liste/Grid des favoris
- Options: Ajouter au panier, Comparer, Supprimer
- Message vide si pas de favoris
- Lien vers produits recommandés

#### Design
- Grid responsive (2-4 colonnes)
- Cards avec actions (Add, Remove, Compare)
- Filtre par catégorie optionnel
- Sort par date ajoutée, prix, etc.

#### UI/UX
- Suppression avec confirmation
- Bouton "Ajouter tous au panier"
- Recommandations si page vide
- Persistent favoris (localStorage + BD)

#### Intégration BD
- Créer table `user_favorites`
  ```
  id, user_id, service_id, created_at
  ```

---

### 10. PAGE HISTORIQUE TRANSACTIONS - `/app/history/page.tsx`

#### Fonctionnalité
- Affichage détaillé de l'historique de toutes les transactions
- Filtres par période, catégorie, montant
- Export en PDF
- Recherche

#### Contenu Essentiel
- Tableau avec colonnes: Date, Service, Montant, Statut, Action
- Filtres sidebar: Période (Date picker), Catégorie, Montant Min/Max, Statut
- Boutons: Voir détails, Télécharger PDF, Réapprovisionner
- Pagination

#### Design
- Tableau responsive
- Filtres sidebar/drawer mobile
- Statuts avec couleurs (Complété: vert, Échoué: rouge, Attente: orange)
- Icônes pour actions

#### UI/UX
- Recherche textuelle en temps réel
- Filtres appliqués dynamiquement
- Pagination ou infinite scroll
- Export PDF avec header/footer

---

### 11. PAGE PAIEMENT AVEC MULTIPLE MÉTHODES - AMÉLIORATION `/app/checkout/[orderId]/page.tsx`

#### Améliorations nécessaires
**Sections:**
1. Résumé du panier
2. Adresse de livraison (form ou depuis profil)
3. Sélection méthode de paiement avec logos:
   - D17 (sélectionné par défaut)
   - Flouci
   - Carte bancaire (Visa/Mastercard)
   - Portefeuille (si implémenté)
4. Résumé avec TVA/frais
5. Bouton "Confirmer et payer"

**Validation:**
- Vérifier l'adresse
- Vérifier le numéro de carte
- Confirmation avant paiement

#### Design
- Étapes visuelles (Progress bar: Panier → Livraison → Paiement → Confirmation)
- Méthodes de paiement en cards cliquables
- Icônes des prestataires
- Couleur de succès pour le résumé

---

### 12. PAGE GESTION COMPTE/PARAMÈTRES - AMÉLIORATION `/app/dashboard/page.tsx`

#### Améliorations nécessaires
**Nouvel onglet: Paramètres**
1. **Profil:**
   - Modifier nom, prénom
   - Modifier email
   - Modifier numéro téléphone
   - Upload avatar/photo

2. **Sécurité:**
   - Changer mot de passe
   - Authentification 2FA (optionnel)
   - Sessions actives
   - Appareils connectés

3. **Préférences:**
   - Langue (FR/EN/AR)
   - Notifications (Email, SMS, In-app)
   - Thème (Light/Dark)

4. **Adresses:**
   - Liste des adresses sauvegardées
   - Ajouter/Modifier/Supprimer adresse
   - Définir adresse par défaut

5. **Méthodes de paiement:**
   - Cartes sauvegardées
   - Ajouter/Modifier/Supprimer
   - Portefeuille/Solde

#### Design
- Layout similaire aux onglets existants
- Formulaires clairs avec validations
- Confirmations pour actions sensibles
- Messages de succès/erreur

---

### 13. PAGE RECHERCHE GLOBALE - `/app/search/page.tsx`

#### Fonctionnalité
- Recherche tous les services par keywords
- Filtres avancés (Catégorie, Prix, Note)
- Résultats paginés
- Suggestions/autocomplétion

#### Contenu Essentiel
- Barre de recherche prominent en haut
- Filtres sidebar
- Grid de résultats
- Message "Aucun résultat"
- Suggestions si vide

#### Design
- Barre de recherche sticky top
- Sidebar pour filtres
- Résultats cards identiques aux produits
- Facettes pour filtres

#### UI/UX
- Recherche en temps réel avec debounce
- Suggestions de corrections d'orthographe
- Filtres dynamiques basés sur résultats

---

### 14. PAGE RÉCOMPENSES/LOYALTY (OPTIONNEL) - `/app/rewards/page.tsx`

#### Fonctionnalité
- Afficher les points de fidélité de l'utilisateur
- Historique des récompenses
- Catalogue d'échanges
- Niveaux VIP

#### Contenu Essentiel
- Balance points en gros chiffre
- Progression VIP (barre)
- Avantages du niveau actuel
- Historique transactions points
- Catalogue récompenses disponibles

#### Design
- Card centrale avec points balance
- Progression VIP visuelle
- Grid de récompenses
- Tableau historique

---

### 15. PAGE EMAIL VALIDATION/VÉRIFICATION - `/app/verify-email/page.tsx`

#### Fonctionnalité
- Demander vérification email après inscription
- Code OTP ou lien de vérification
- Renvoyer le code
- Redirection après vérification

#### Contenu Essentiel
- Message: "Vérifiez votre email"
- Champ pour code OTP
- Bouton "Renvoyer le code"
- Lien "Changer d'email"

#### Design
- Card centrée
- Input grande pour code
- Timer pour renvoi

---

## Résumé des Priorités

### Tier 1 - CRITIQUE (À faire en priorité)
1. ✅ Amélioration `/checkout` (multiple payment methods)
2. ✅ Amélioration `/dashboard` (paramètres, sécurité, adresses)
3. `/app/not-found.tsx` - Page 404
4. `/app/error.tsx` - Page 500
5. `/app/support/page.tsx` - Support & FAQ
6. `/app/product/[id]/page.tsx` - Détails produit

### Tier 2 - IMPORTANT (À faire après)
7. `/app/favorites/page.tsx` - Favoris
8. `/app/terms/page.tsx` - Conditions
9. `/app/privacy/page.tsx` - Confidentialité
10. `/app/about/page.tsx` - À propos
11. `/app/history/page.tsx` - Historique

### Tier 3 - OPTIONNEL (Bonus)
12. `/app/search/page.tsx` - Recherche globale
13. `/app/category/[slug]/page.tsx` - Catégories détaillées
14. `/app/rewards/page.tsx` - Programme loyalty
15. `/app/verify-email/page.tsx` - Email verification

---

## Notes d'Intégration

### Base de données - Tables manquantes à créer:
```
- support_tickets (contact form)
- product_reviews (avis utilisateurs)
- user_favorites (produits favoris)
- user_addresses (adresses sauvegardées)
- loyalty_points (historique points)
```

### Composants à créer:
- `<ProductCard />` - Card produit réutilisable
- `<CategoryHeader />` - Header catégorie
- `<SectionFAQ />` - Accordion FAQ
- `<FilterSidebar />` - Sidebar filtres
- `<PaymentMethods />` - Sélection méthode paiement
- `<RatingStars />` - Affichage notes
- `<ReviewForm />` - Formulaire avis

### Environment Variables (si nécessaire):
- `NEXT_PUBLIC_STRIPE_KEY` (si intégration Stripe)
- `SMTP_CONFIG` (pour emails support)
- `FLOUCI_API_KEY` (si implémentation réelle)
- `D17_API_KEY` (si implémentation réelle)

---

## Cohérence de Design

✅ **Couleurs**: Utiliser les tokens CSS définis dans globals.css
✅ **Typographie**: Font-sans pour corps, cohérent avec layout.tsx
✅ **Spacing**: Utiliser Tailwind spacing scale (p-4, gap-6, etc.)
✅ **Responsive**: Mobile-first, breakpoints: sm, md, lg, xl
✅ **Composants**: Réutiliser shadcn/ui existants (Button, Card, Input, etc.)
✅ **Navigation**: Header cohérent avec page produits
✅ **Footer**: Footer cohérent avec homepage

---

## Fichiers à Créer - Ordre Recommandé

1. `/app/not-found.tsx` - Simple, rapide
2. `/app/error.tsx` - Simple, rapide
3. `/app/support/page.tsx` - Support & FAQ importantes
4. `/app/product/[id]/page.tsx` - Produits détaillés essentiels
5. `/app/favorites/page.tsx` - Fonctionnalité populaire
6. `/app/terms/page.tsx` - Juridique
7. `/app/privacy/page.tsx` - Juridique
8. `/app/about/page.tsx` - Marketing
9. Amélioration `/dashboard` - Paramètres utilisateur
10. Amélioration `/checkout` - Paiement multiple méthodes
