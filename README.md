
# HotelBot — Eliza

> Concept de chatbot intelligent dédié au secteur hôtelier, conçu dans le cadre du projet Eliza à Epitech Nancy.

## Présentation

**HotelBot** est un concept de chatbot intelligent destiné au secteur hôtelier.

L'objectif est de concevoir un assistant conversationnel capable d'accompagner les clients dans différentes étapes de leur parcours : recherche d'informations, réservation, recommandations et gestion de demandes courantes.

Le projet explore l'utilisation de l'intelligence artificielle dans un contexte professionnel, en combinant :

* Intelligence artificielle
* Expérience utilisateur
* Automatisation
* Besoins métiers
* Réflexion éthique

Le projet a été réalisé dans le cadre du **Bachelor Informatique à Epitech Nancy**, au sein du projet **Eliza**.

> **État actuel :** ce repository personnel contient principalement la Landing Page interactive développée pour présenter le concept HotelBot. Les fonctionnalités de chatbot, de réservation et de recommandation décrites dans le projet correspondent au concept fonctionnel et aux perspectives d'évolution.

---

## Objectifs

### Pour les clients

* Simplifier l'accès aux informations
* Réduire le temps d'attente
* Fournir des réponses rapides aux demandes courantes
* Faciliter le parcours de réservation
* Proposer des recommandations personnalisées
* Améliorer l'expérience utilisateur

### Pour les établissements hôteliers

* Automatiser certaines demandes répétitives
* Réduire le temps consacré aux demandes courantes
* Améliorer la disponibilité du service client
* Faciliter la présentation des services
* Développer les ventes additionnelles
* Améliorer la satisfaction client

---

## Problématique

Les établissements hôteliers doivent gérer de nombreuses demandes répétitives :

* Informations sur les horaires
* Disponibilité des chambres
* Tarifs
* Services proposés
* Conditions d'annulation
* Demandes de réservation
* Modifications ou annulations
* Informations pratiques

Ces demandes peuvent mobiliser du temps pour les équipes et entraîner des délais de réponse.

HotelBot propose donc le concept d'un assistant conversationnel capable d'automatiser certaines de ces interactions tout en permettant une intervention humaine lorsque cela est nécessaire.

---

## Fonctionnalités envisagées

### Réservation intelligente

Le chatbot pourrait permettre au client de :

* Rechercher une chambre disponible
* Indiquer ses dates de séjour
* Préciser le nombre de personnes
* Comparer différentes chambres
* Consulter les prix
* Recevoir une confirmation

### Assistant FAQ

HotelBot pourrait répondre aux questions fréquentes concernant :

* Check-in et check-out
* Wi-Fi
* Piscine
* Petit déjeuner
* Services de l'hôtel
* Politique d'annulation
* Localisation
* Informations pratiques

### Recommandations personnalisées

Le chatbot pourrait proposer des recommandations en fonction de :

* Type de chambre recherché
* Budget
* Préférences du client
* Historique de réservation
* Saison
* Événements locaux

Exemple :

> Vous avez déjà réservé une chambre double. Souhaitez-vous réserver le même type de chambre pour votre prochain séjour ?

### Upselling

Le chatbot pourrait également proposer des services supplémentaires :

* Petit déjeuner
* Spa
* Transfert depuis l'aéroport
* Excursions
* Room service
* Packages personnalisés

### Gestion des réservations

Les fonctionnalités envisagées comprennent :

* Consultation d'une réservation
* Modification
* Annulation
* Confirmation

### Multicanal

À terme, le concept pourrait être accessible depuis :

* Site web
* Application mobile
* WhatsApp
* Messenger

---

## Scénarios d'utilisation

### Réservation

**Utilisateur :**

> Bonjour, je cherche une chambre pour 2 personnes du 10 au 12 juin.

**HotelBot :**

> J'ai trouvé plusieurs options adaptées :
>
> * Chambre Standard : 120 €
> * Chambre Deluxe : 160 €
> * Suite : 220 €

### Question fréquente

**Utilisateur :**

> À quelle heure est le check-in ?

**HotelBot :**

> Le check-in est disponible à partir de 14h et le check-out jusqu'à 11h.

### Recommandation

**Utilisateur :**

> Je veux organiser un week-end romantique.

**HotelBot :**

> Je vous recommande une chambre Deluxe accompagnée d'un pack romantique.

### Modification

**Utilisateur :**

> Je veux modifier ma réservation.

**HotelBot :**

> Bien sûr. Veuillez fournir votre numéro de réservation.

---

## Landing Page

La principale réalisation présente dans ce repository est une **Landing Page interactive dédiée à HotelBot**.

Elle a pour objectif de présenter progressivement le produit, son concept, ses fonctionnalités et son impact potentiel.

### Fonctionnement de la Landing Page

```text
Landing Page
│
├── Navigation
│
├── Hero
│   └── Présentation de HotelBot
│
├── Fonctionnalités
│
├── Démonstration
│   └── Conversation simulée
│
├── Impact
│   └── Compteurs animés
│
├── Présentation du concept
│
└── Call To Action
```

### Interactions développées

La Landing Page intègre notamment :

* Navigation sticky lors du défilement
* Navigation entre les différentes sections
* Animations d'apparition au scroll
* Animation de conversation du chatbot
* Compteurs animés dans la section Impact
* Boutons et appels à l'action
* Interface responsive

Les animations et interactions sont gérées côté client avec JavaScript.

---

## Technologies utilisées

| Domaine       | Technologies                     |
| ------------- | -------------------------------- |
| Structure     | HTML5                            |
| Style         | CSS3                             |
| Interactivité | JavaScript                       |
| Animations    | JavaScript, IntersectionObserver |
| Typographies  | Google Fonts                     |
| Versionnement | Git, GitHub                      |

---

## Ma contribution

Dans le cadre du projet Eliza, j'ai principalement contribué à la **documentation du concept HotelBot** ainsi qu'à la **conception et au développement de sa Landing Page**.

### Documentation et réflexion produit

J'ai contribué à la formalisation de plusieurs éléments du projet :

* Objectifs du chatbot
* Utilisateurs cibles
* Problématiques identifiées
* Fonctionnalités envisagées
* Scénarios d'utilisation
* Valeur ajoutée du produit
* Impact business
* Dimension éthique
* Perspectives d'évolution

### Développement frontend

J'ai également conçu et développé la Landing Page de HotelBot :

* Structure HTML
* Mise en forme CSS
* Identité visuelle
* Navigation
* Sections de présentation
* Interface de démonstration
* Animations
* Interactions JavaScript
* Navigation sticky
* Animations avec `IntersectionObserver`
* Animation de conversation
* Compteurs animés
* Responsive design

> **Important :** la Landing Page présente le concept HotelBot. Le backend conversationnel, la base de données, la gestion réelle des réservations et l'intégration d'un modèle d'intelligence artificielle ne sont pas implémentés dans ce repository personnel.

---

## Structure du projet

```text
eliza/
│
├── Landing_page/
│   ├── landing.html
│   ├── landing.css
│   └── landing.js
│
├── .gitignore
└── README.md
```

---

## Lancer le projet

La version présente dans ce repository est une Landing Page statique.

Aucune installation de dépendances n'est nécessaire.

Depuis le dossier du projet, ouvrir :

```text
Landing_page/landing.html
```

dans un navigateur.

Pour faciliter le développement, un serveur local tel que **Live Server** peut également être utilisé.

---

## Dimension éthique

Le concept HotelBot prend en compte plusieurs principes liés à l'utilisation d'un assistant intelligent :

* Informer clairement l'utilisateur qu'il interagit avec un chatbot
* Protéger les données personnelles
* Éviter les réponses discriminatoires
* Prévoir une possibilité de contact avec un humain
* Utiliser les données uniquement dans le cadre nécessaire au service

Ces principes font partie de la réflexion produit et pourront être approfondis lors d'une future implémentation technique.

---

## Impact business envisagé

HotelBot pourrait contribuer à :

### Optimisation

* Réduire le temps consacré aux demandes répétitives
* Automatiser certaines interactions
* Améliorer la disponibilité du service

### Expérience client

* Réduire le temps d'attente
* Fournir des réponses rapides
* Faciliter les réservations
* Personnaliser les recommandations

### Développement commercial

* Promouvoir les services additionnels
* Faciliter l'upselling
* Augmenter les opportunités de réservation en ligne

Les chiffres éventuellement présentés dans le concept sont des **objectifs ou hypothèses de performance** et ne constituent pas des résultats mesurés sur une solution déployée.

---

## Évaluation de la performance

Une future version fonctionnelle pourrait être évaluée à partir de plusieurs indicateurs :

* Taux de satisfaction des utilisateurs
* Temps moyen de réponse
* Nombre de demandes automatisées
* Taux de résolution sans intervention humaine
* Nombre de réservations réalisées via le chatbot
* Taux de conversion
* Utilisation des services additionnels

---

## Perspectives d'évolution

Le concept pourrait évoluer vers une véritable application fonctionnelle avec :

* Intégration d'un modèle conversationnel
* Backend dédié
* API REST
* Base de données
* Gestion réelle des utilisateurs
* Gestion des chambres et disponibilités
* Gestion des réservations en temps réel
* Système de recommandations
* Intégration de services hôteliers externes
* Intégration de différents canaux de communication
* Déploiement dans le cloud

---

## Équipe

Projet réalisé en équipe avec :

* Tom
* Christian
* Ndiémé

---

## Contexte académique

**Projet :** Eliza
**Formation :** Bachelor Informatique
**Établissement :** Epitech Nancy

Le projet avait pour objectif d'explorer la conception d'un chatbot intelligent et son application à un contexte professionnel, en combinant réflexion produit, expérience utilisateur, automatisation et technologies numériques.

---

## Conclusion

**HotelBot** est une exploration de l'application de l'intelligence artificielle au secteur hôtelier.

Le projet associe une réflexion sur les besoins des utilisateurs et des établissements avec une première réalisation frontend concrète : une **Landing Page interactive permettant de présenter le concept et ses fonctionnalités**.

Ce repository personnel met particulièrement en avant ma contribution à la **documentation du projet et au développement frontend de la Landing Page**.
