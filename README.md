


### Vorbereitungen

#### Paketmanager und externe Module installieren

Zum Verwalten der Abhängigkeiten nutzen wir den Paketmanager [npm], der Bestandteil der populären JavaScript-Laufzeitumgebung [nodeJS] ist und eine riesige Palette an Javascript Modulen beherbergt. 
Hierzu laden wir die aktuellste Version herunter ("Latest Features") und tragen den Installationsordner in den Umgebungsvariablen ein:

[ INSERT Bild mit Pfad in Umgebungsvariablen]

Der Paketmanager lässt sich jetzt direkt per  *npm* von der Kommandozeile aus aufrufen ohne jedes Mal den genauen Pfad angeben zu müssen.
Zum initialisieren des Projekts erstellen wir einen  neuen Ordner namens "StringCalculator". Im neu angelegten Ordner rufen wir per Kommandozeile folgenden Befehl auf:

```sh
$ npm init
```

Nachdem wir alle Eingabeaufforderungen bestätigt haben erzeugt der Paketmanager eine Datei namens *package.json*:

[ INSERT Bild mit erstellter package.json]

Diese Datei enthält u.A. Metadaten und Abhängigkeiten zu externen Paketen.

Nun können wir unsere benötigten Pakete herunterladen und mit dem Zusatz *--save-dev* in der *package.json* einmalig als Abhängigkeit registrieren:

```sh
$ npm install --global mocha
$ npm install --save-dev mocha
$ npm install --save-dev chai
```



> Hinweis: 
> Der Paketmanager und die Laufzeitumgebung sind zwei vollkommen verschiedene Programme. 
> Mittels der Laufzeitumgebung lässt sich Javascript außerhalb des Browsers ausführen wohingegen die Verantwortlichkeit des Paketmanagers darin besteht
> Abhängigkeiten aufzulösen und externe Pakete bei Bedarf herunterzuladen.




























 
#### Entwicklungsumgebung aufsetzen



### User Story

### Implementierung

### Fazit

#### Finales Projekt auschecken und ausführen


[npm]: <https://www.npmjs.com/>
[nodeJS]: <https://nodejs.org/en/>




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
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


