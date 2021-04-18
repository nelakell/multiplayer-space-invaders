# Space Invaders

Bilder von https://kenney.nl/assets/space-shooter-redux

# Module

Das Spiel ist bis anhin in nachfolgenden Module aufgeteilt:

- Player: Enthält die wesentlichen Eigenschaften des Spieler-Raumschiffes sowie die Funktionalität, um es zu bewegen und den Laser abzufeuern.

- Feind: Enthält die wesentlichen Eigenschaften der feindlichen Raumschiffe. Im Vergleich zum Spieler wird hier jedoch die Funktionalität in ein weiteres Modul ausgelagert, da die Feinde in einer grossen homogenen Anzahl auftreten.

- Laser: Dieses Modul enthält die wesentlichen Eigenschaften der Laser-Kanone sowie die Funktionalität, um den Laser zu bewegen und zu prüfen, ob er den Game-Rand bereits verlassen hat.

- EnemiesEngine: Dieses Modul soll das Verhalten der feindlichen Raumschiffe steuern und koordinieren.

- Game: Dieses Modul soll den Game-Status halten sowie die Instanzen der wesentlichen anderen Klassen innerhalb der anderen Module erstellen und steuern. Zudem enthält dieses Modul die Update-Funktionalität für das Game, welche durch die main.js-Klasse ausgelöst wird (Game Loop).

- Main: Dieses Modul startet den Game Loop und beinhaltet Event-Listeners zum stuern des Spieler-Raumschiffs.
