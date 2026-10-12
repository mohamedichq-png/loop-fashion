# LOOP FASHION — Maison de Curatelle Vintage & Seconde Main Paris

Site e-commerce haut de gamme complet, responsive et prêt pour la production pour **LOOP FASHION**, marque française de prêt-à-porter féminin de seconde main d'exception et de pièces vintage curatées avec ambitions de rayonnement international.

---

## ✦ Identité de Marque & Design System

- **Palette de couleurs officielle :**
  - **Vert Sauge** : `#8FA88A`
  - **Terracotta** : `#A65D43`
  - **Crème Chaleureux** : `#F5F1E8`
  - **Anthracite Profond** : `#242424`
  - **Blanc Pur** : `#FFFFFF`
- **Typographie éditoriale :**
  - Titres & En-têtes : *Cormorant Garamond* (Serif d'inspiration haute couture parisienne)
  - Textes courants, navigation & fiches techniques : *Plus Jakarta Sans* (Sans-serif géométrique contemporain)
- **Symbole de Marque :**
  - Emblème d'inspiration boucle infinie entrelacée avec la silhouette d'un cintre parisien d'atelier, mariant les teintes sauge et terracotta.
  - Composant isolé `src/components/Logo.jsx` prêt à accueillir tout asset graphique personnalisé.

---

## ✦ Architecture des 29 Pages & Routes Réalisées

1. **Accueil** : `/` (Bandeau d'annonces, Hero éditorial, Catégories phares, Nouveautés, Sélections thématiques, Récit de marque, Guide de style « Comment porter nos pièces », Galerie vivante, Newsletter RGPD, Réassurance vérifiée).
2. **Toute la boutique** : `/boutique` (Catalogue complet avec filtres par état, taille, matière, prix et tri).
3. **Nouveautés** : `/nouveautes` (Dernières pépites chinées de la semaine).
4. **Vêtements** : `/vetements` (Rayon global de prêt-à-porter).
5. **Robes** : `/robes` (Robes fluides en soie, robes structurées d'époque).
6. **Hauts & Chemises** : `/hauts` (Chemisiers en soie lavée, cols lavallière, broderies anglaises).
7. **Vestes & Blazers** : `/vestes-blazers` (Laines peignées d'archive, coupes tailleur, trenchs).
8. **Pantalons & Jeans** : `/pantalons-jeans` (Pantalons tailleur à pinces, denims bruts 501 vintage sans élasthanne).
9. **Maille & Tricot** : `/maille` (Pulls cachemire 4 fils, mohair brossé, cardigans).
10. **Sélection Vintage d'Archives** : `/vintage` (Pièces des années 70 à 90 sélectionnées pour leur caractère historique).
11. **Maroquinerie & Sacs** : `/sacs` (Cuirs box patinés, sacs besaces Céline vintage, sacs seaux Lancel).
12. **Accessoires & Carrés** : `/accessoires` (Carrés de soie Hermès roulottés main, ceintures sculptées, broches dorées or fin).
13. **Fiche Produit Détaillée** : `/produit/[slug]` (Galerie multi-photos haute définition, guide des mesures prises à plat au millimètre, diagnostic certifié de l'état, authenticité, conseil de style, pièce unique alert, ajout au panier, favoris, pièces assorties).
14. **Moteur de Recherche Dédié** : `/recherche` (Recherche instantanée multi-critères et suggestions rapides).
15. **Coups de Cœur & Favoris** : `/favoris` (Gestion de la wishlist, transfert au panier en un clic, partage).
16. **Panier d'Achat Détaillé** : `/panier` (Jauge de livraison offerte, quantités avec garde-fou pièce unique, codes privilèges, calculs en temps réel).
17. **Commande Sécurisée** : `/commande` (Tunnel en 3 étapes : coordonnées, transporteur Colissimo / Mondial Relay / Showroom Marais, paiement simulé crypté SSL 3D-Secure, génération de facture et reçu de commande).
18. **Espace Client** : `/compte` (Historique des commandes et suivis, carnet d'adresses, préférences de communication, session démo).
19. **Notre Histoire** : `/notre-histoire` (Manifeste de marque, chine individuelle, engagement qualité parisien).
20. **Nos Engagements Vérifiés** : `/engagements` (Contrôle millimétré pièce par pièce, emballages éco-responsables FSC, transparence, respect légal de rétractation).
21. **Contact & Showroom** : `/contact` (Formulaire avec sélection d'objet, coordonnées showroom Le Marais Paris, horaires).
22. **Questions Fréquentes (FAQ)** : `/faq` (Accordéons interactifs sur authenticité, mesures, expédition, retours, paiements).
23. **Livraison & Délais** : `/livraison` (Grille tarifaire transporteurs, délais indicatifs, expédition internationale).
24. **Retours & Rétractation** : `/retours` (Procédure en 3 étapes, délai légal de 14 jours, conditions de remboursement sous 72h).
25. **Politique de Confidentialité** : `/confidentialite` (Conformité RGPD et loi Informatique & Libertés avec variables personnalisables).
26. **Conditions Générales de Vente (CGV)** : `/conditions-generales` (Cadre contractuel de la vente à distance de seconde main).
27. **Mentions Légales** : `/mentions-legales` (Informations éditeur et hébergeur avec champs éditables `[Raison Sociale]`, `[SIRET]`, etc.).
28. **Préférences de Cookies** : `/cookies` (Bandeau et panneau modale interactif de gestion du consentement).
29. **Page 404 Personnalisée** : `/404` (Design sur-mesure invitant à explorer le vestiaire).

---

## ✦ Fonctionnalités E-Commerce Intégrées

- **Tiroir Panier Latéral (Cart Drawer) & Page Dédiée** : Ouverture fluide depuis n'importe quelle page avec calcul dynamique de la livraison offerte en France dès 150€.
- **Codes Privilèges Fonctionnels** : Testez les codes `BIENVENUE10` (-10%) ou `ARCHIVE15` (-15%).
- **Aperçu Rapide (Quick View Modal)** : Bouton œil sur chaque carte produit pour inspecter les matières et dimensions sans quitter la grille.
- **Support Bilingue Français / Anglais (i18n)** : Bascule instantanée FR ⇄ EN dans l'en-tête et le pied de page, mémorisée en `localStorage`.
- **Wishlist Réactive & Persistante** : Sauvegarde des pièces favorites dans le navigateur avec indicateur dynamique de nombre dans le header.
- **Sécurité & Conformité RGPD** : Gestion des cookies conforme CNIL (Accepter, Refuser, Personnaliser).

---

## ✦ Lancement Local

```bash
# Installation des dépendances (déjà effectuée)
npm install

# Démarrage du serveur de développement Vite
npm run dev

# Construction pour mise en production
npm run build
```

Le site est accessible en local sur : `http://localhost:3000/`.

---

## ✦ Espace d'Administration Sécurisé (`/admin`)

LOOP FASHION dispose d'une console de direction privée et hermétique aux visiteurs publics, accessible via la route `/admin`.

### 1. Sécurité & Cloisonnement Strict
- **Zéro affichage public** : Aucun bouton d'administration, de modification ou de suppression n'apparaît sur le site public ou l'espace client.
- **Protection serveur** : L'accès à l'API (`/api/admin/*`) et aux opérations de base de données est protégé par jeton de session cryptographique Bearer avec comparaison temporelle stricte (`crypto.timingSafeEqual`) et limitation des tentatives contre les attaques par force brute.
- **Variables d'environnement** : Les identifiants et secrets de session sont configurés dans le fichier `.env` côté serveur et ne sont jamais exposés dans le bundle client.
- **Filtrage des brouillons** : Les articles non publiés (`isPublished: false`) ou en statut « Brouillon » sont automatiquement exclus de l'API publique `/api/products`.

### 2. Fonctionnalités d'Administration
- **Gestion des Pièces** : Création, modification complète (prix, prix barré, tailles, état d'usage, diagnostic matière, dimensions, descriptions, conseils de style), suppression et bascule Publication/Brouillon en 1 clic.
- **Téléversement d'Images** : Upload d'images produit avec prévisualisation et stockage optimisé dans `/public/uploads/`.
- **Gestion des Commandes** : Consultation des commandes passées en temps réel avec modification de statut (`En attente`, `En préparation`, `Expédiée`, `Livrée`, `Annulée`).
- **Synchronisation Instantanée** : Toute modification enregistrée en base de données (`data/database.json`) est immédiatement répercutée sur la boutique publique.

### 3. Identifiants par défaut (Configurés dans `.env`)
- **URL d'accès** : `http://localhost:3000/admin`
- **Email** : `admin@loop-fashion.fr`
- **Mot de passe** : `LoopVintageAdmin2026!`
