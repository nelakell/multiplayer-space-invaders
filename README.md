# Space Invaders 👾
Bilder von https://kenney.nl/assets/space-shooter-redux.

# Das Spiel
Implementierung des Shoot'em Up Space Invaders. Ein Spieler (Hero) kämpft gegen die bevorstehende Invasion der Aliens (Invaders).
Dabei hat er drei Leben zur Verfügung und ist sich zuhnehmender Schwierigkeit konfrontiert. Der Hero Kämpft so lange wie er Leben
übrig hat. Bleiben keine Leben mehr übrig, wird die erreichte Punktzahl sowie die bisher erreichten Highscores, welche in einer
MongoDB persistiert werden, angezeigt.

# Screens
Die Variante von Space Invaders durchläuft während einer Runde drei Screens:
* StartScreen: Eingabe des Spielernamens, Button um das Spiel zu starten.
* BattleScreen: Das eigentliche Spiel welches so lange läuft wie der Hero (Benutzer) Leben übrig hat.
* ScoreScreen: Anzeige der erreichten Score und Gesamtrangliste.

# Komponenten des Spiels
Die Komponenten des Spiels sind:
* Hero: Die Spielfigur des Benutzers. Das Raumschiff kann sich in 2D bewegen und den Laser abfeuern um damit die Invaders abzuwehren und dadurch die Invasion zu verhindern.
* Invader: Die feindlichen Raumschiffe. Autonome Bewegung und Schussabgabe innerhalb des Spielfeldes.
* EnemiesEngine: Verwaltung (Engine) der feindlichen Raumschiffe. Ist besorgt Raumschiffe basierend auf dem aktuellen Level zu generieren.
* Laser: Ein einzelner Schuss.
* Bonus: Ein Bonus-Gegenstand welcher vom zerstörten Invader aus nach unten gleitet.
* Chat: Die beiden Spieler können sich während des Spiels zusammen über einen Chat unterhalten

# Installation

## Prerequisites
* Node version 16.*

## Backend
Auf der Konsole im Projekt Root einzugeben:
* cd backend
* npm install
* npm run build
* npm start

## Frontend
Auf der Konsole im Projekt Root einzugeben:
* cd frontend
* npm install
* npm start
