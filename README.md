


### Vorbereitungen

#### Paketmanager und externe Module installieren

Zum Verwalten der Abhängigkeiten nutzen wir den Paketmanager [npm], der Bestandteil der populären JavaScript-Laufzeitumgebung [nodeJS] ist und eine riesige Palette an Javascript-Modulen beherbergt. 
Hierzu laden wir die aktuellste Version herunter ("Latest Features") und tragen den Installationsordner in den Umgebungsvariablen ein:

[ INSERT Bild mit Pfad in Umgebungsvariablen]

Der Paketmanager lässt sich jetzt direkt per  *npm* von der Kommandozeile aus aufrufen ohne jedes Mal den genauen Pfad angeben zu müssen.

> Hinweis: 
> Der Paketmanager und die Laufzeitumgebung sind zwei vollkommen verschiedene Programme. 
> Mittels der Laufzeitumgebung lässt sich Javascript außerhalb des Browsers ausführen wohingegen die Verantwortlichkeit des Paketmanagers darin besteht
> Abhängigkeiten aufzulösen und externe Pakete bei Bedarf herunterzuladen.


Zum initialisieren des Projekts erstellen wir einen  neuen Ordner namens "StringCalculator". Im neu angelegten Ordner rufen wir per Kommandozeile folgenden Befehl auf:

```sh
$ npm init
```

Nachdem wir alle Eingabeaufforderungen bestätigt haben erzeugt der Paketmanager eine Datei namens *package.json*:

[ INSERT Bild mit erstellter package.json]

Diese Datei enthält u.A. Metadaten und Abhängigkeiten zu externen Paketen.

Nun können wir externe Pakete herunterladen und mit dem Zusatz *--save-dev* in der *package.json* einmalig als Abhängigkeit registrieren. 
Für dieses Tutorial benötigen wir das Test-Framework [mocha] sowie die Assertion-Bibliothek [chai]:

```sh
$ npm install --global mocha
$ npm install --save-dev mocha
$ npm install --save-dev chai
```

#### Entwicklungsumgebung aufsetzen
Das Projekt kann im Prinzip mit jedem beliebigen Texteditor bearbeitet werden, jedoch bietet sich eine IDE mit einer guten Autovervollständigung für Typeskript an. 
Ein kostenloser Editor mit herausragender Autovervollständigung ist beispielsweise [Visual Studio Code].
Nachdem das Programm heruntergeladen und installiert wurde, lässt sich unser überschaubares Projekt einfach als Ordner öffnen und direkt bearbeiten. 
Die Projektstruktur sollte folgendermaßen aussehen:

[INSERT Bild mit Projektstuktur in VS Code]

Wie zu sehen besteht das Projekt zur Zeit nur aus einer *package.json* und den heruntergeladenen Paketen im Ordner *node_modules*. 
Wir legen zwei weitere Ordner *src* und *test* für Quellcode und zugehörige Unit-Tests an. 
Zudem erstellen wir eine Datei namens *tsconfig.json* in der wir spezifizieren welche Typeskript-Dateien (mit der Endung *.ts*) der eingebettete Transpiler von Visual Studio Code übersetzen soll:

[INSERT Bild mit Projektstuktur in VS Code 2]

Damit alle *.ts" nach jeder Änderung erneut transpiliert werden, konfigurieren wir einen Visual Studio spezifischen [Visual Studio TS Task].
Alternativ können wir auch das npm-Modul [tsc] global installieren und im *watch*-Modus starten:

```sh
$ npm install -g typescript
$ tsc --watch
```

Diese Methode funktioniert unabhängig von der verwendeten IDE. 



### User Story
Nun da alle Abhängigkeiten installiert sind und der Code automatisch nach jeder Änderung in Javascript umgewandelt wird, ist es an der Zeit, die umzusetzende Anforderung bzw. User Story vorzustellen.

### Implementierung

### Fazit

#### Finales Projekt auschecken und ausführen


[npm]: <https://www.npmjs.com/>
[nodeJS]: <https://nodejs.org/en/>
[mocha]: <https://mochajs.org/>
[chai]: <http://chaijs.com/>
[Visual Studio Code]: <https://code.visualstudio.com/>
[Visual Studio TS Task]: <https://code.visualstudio.com/docs/languages/typescript>
[tsc]: <https://www.typescriptlang.org/index.html#download-links>




```typescript
let s = "Typescript syntax highlighting";
```




### Installation
Install local dependencies and mocha:
```sh
$ npm install
$ npm install -g mocha
```

### Step by step Installation

Create package.json and install dependencies:
```sh
npm init
npm install --global mocha
npm install --save-dev mocha
npm install --save-dev chai
```
Install type definitions to improve autocompletion:
```sh
npm install --save-dev @types/mocha
npm install --save-dev @types/chai
```


### Usage
Watch for changes in .ts files and recompile of neccessary:
```sh
tsc --watch
```

Run tests:
```sh
mocha
```
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


