Système de réservation de ticket
================================

Dans cet exercice, il est demandé de reproduire une partie du système de réservation de tickets pour les accrédités du Festival de Cannes.  
Vous utiliserez pour cela AngularJS.

Données
-------
Les données fournies dans le fichier `raw-data.txt` correspondent aux séances du 14 au 20 mai.  

__Format__  
  Nom du film  
  Nom du réalisateur  
  Durée du film (H:i)  
  Projection : Date (Y-m-d), heure (H:i), lieu (Lumière, Debussy), Demande (High ou normal par défaut)  

__Utile à savoir__  
* Un film n'est jamais projeté plusieurs jours différents
* Deux films ne sont jamais projetés en même temps dans la même salle

Rendu visuel
------------
![Alt text](http://i.imgur.com/tObNAYR.png)

Le calendrier est un tableau.  
Chaque ligne correspond à une journée.  
Chaque journée est découpée en 8 créneaux horaires : 1 pour la salle Debussy, 7 pour la salle Lumière.  
Les créneaux de la salle Lumière sont les suivants : 
- 08:30-11:00
- 11:00-13:30
- 13:30-15:00
- 15:00-18:30
- 18:30-22:00
- 22:00-23:59
- Après 23:59

Toutes les images nécessaires sont disponibles dans le dossier `images`. Vous êtes libres d'utiliser d'autres image de votre choix.

Règles de gestion et d'affichage
--------------------------------
__Calendrier__  
* Certains créneaux horaires ne sont pas utilisés : il est important de les marquer comme tel
* Lorsqu'une projection est en "High demand", il est important de le signaler (point rouge)
* Chaque case doit faire apparaître le nom du film, son réalisateur et l'heure de début du film
* Les cases des projections non réservées doivent apparaître blanche avec la mention cliquable (curseur main) "demander"

__Réservation__  
* Au clic sur une projection "disponible" :
    - celle-ci passe en orange, l'icône "horaire" devient l'icone "sablier", le texte passe de "demander" à "demandée"
    - toutes les autres projections du même film passent en grisé, le texte passe à "film demandé", la case n'est plus cliquable (pas de curseur main)
* Au clic sur une projection "demandée" :
    - Un alerte de confirmation (`window.confirm`) demande à l'utilisateur si il est sûr de lui.
    - Dans le cas positif, la demande pour cette projection est annulée et toutes les autres projections du même film redeviennent disponibles.
* Au clic sur une projection "grisée" :
    - Il ne se passe rien.

__Limitation en place__  
Chaque festivalier n'a droit qu'à 1 seul crédit par jour de présence dans le Festival.  
Dans le cas qui nous occupe, on aura ainsi 7 crédits pour les 7 jours.  
Chaque projection en demande "Normale" coûte 1 crédit.  
Chaque projection en demande "High" coûte 2 crédits.  
Lorsqu'une personne a déjà dépensé tous ses crédits, une alerte (`window.alert`) l'informe de cet état.

Technologies
------------
Vous devez impérativement utiliser AngularJS pour cet exercice.  
Le framework css de votre choix pourra être utilisé.

Notation
---------

1. À partir des données brutes, fabriquez un ou plusieurs fichiers json qui vous permettront d'exploiter les données (4pts)
2. Déployez une application AngularJS capable de récupérer vos données (5pts)
3. Affichez les séances en suivant les spécifications de __calendrier__ (4pts)
4. Respectez les spécifications de __réservation__ (4pts)
5. Respectez les spécifications de __limitation de place__ (4pts)

Seront jugés :
 - Votre connaissance de AngularJS
 - La propreté générale de vos développements
 - Le soin apporté à la réflexion

__Bon courage !__

