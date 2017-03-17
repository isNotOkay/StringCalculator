


### Vorbereitungen

Im Zuge dieses Tutorials soll mittels TDD ein Taschenrechner für Zeichenketten auf Basis folgender Technologien entwickelt werden:

* [Typescript]
* [npm]
* [mocha]

Typescript erweitert Javascript um einige nützliche Features wie Typen, Klassen und Interfaces. 
Die Syntax ähnelt stark der von klassischen Programmiersprachen, jedoch gibt es bei der Art und Weise wie Typescript die genannten Sprachmerkmale umsetzt wesentliche Unterschiede.
In der folgenden Tabelle sind die Unterschiede am Beispiel von Java gegenübergestellt:

| Java | Typescript |
| ------ | ------ |
| ... | ... |
| ... | ... |
| ... | ... |


#### Paketmanager und externe Module installieren

Zum Verwalten der Abhängigkeiten nutzen wir den Paketmanager [npm], der Bestandteil der populären JavaScript-Laufzeitumgebung [nodeJS] ist und eine riesige Palette an Javascript-Modulen beherbergt. 
Hierzu laden wir die aktuellste Version herunter ("Latest Features") und tragen den Installationsordner in den Umgebungsvariablen ein:

![Alt text](images/readme/umgebungsvariablen.png?raw=true "Title")

Der Paketmanager lässt sich jetzt direkt von der Kommandozeile aus aufrufen ohne jedes Mal den genauen Pfad angeben zu müssen:

```sh
$ npm --version
```

> Hinweis: 
> Der Paketmanager und die Laufzeitumgebung sind zwei vollkommen verschiedene Programme. 
> Mittels der Laufzeitumgebung lässt sich Javascript außerhalb des Browsers ausführen wohingegen die Verantwortlichkeit des Paketmanagers darin besteht
> Abhängigkeiten aufzulösen und externe Pakete bei Bedarf herunterzuladen.


Zum initialisieren des Projekts erstellen wir einen neuen Ordner namens "string-calculator". Im neu angelegten Ordner rufen wir folgenden Befehl auf:

```sh
$ npm init
```

Nachdem wir alle Eingabeaufforderungen bestätigt haben erzeugt der Paketmanager eine Datei namens *package.json*, welche zunächst nur allgemeine Metadaten enthält:

![Alt text](images/readme/package_json_1.png?raw=true "Title")

Mit der jetzt vorhandenen *package.json* können wir externe Pakete herunterladen und mit dem Zusatz *--save-dev* einmalig als Abhängigkeit registrieren. 
Für dieses Tutorial benötigen wir das Test-Framework [mocha] sowie die Assertion-Bibliothek [chai]:

```sh
$ npm install --global mocha
$ npm install --save-dev mocha
$ npm install --save-dev chai
```

Zusätzlich müssen wir noch die Typdefinitionen der verwendeten Module installieren damit der Typescript-Transpiler keine Fehler anzeigt:

```sh
$ npm install --save-dev node
$ npm install --save-dev mocha
$ npm install --save-dev chai
```




#### Entwicklungsumgebung aufsetzen
Das Projekt kann im Prinzip mit jedem beliebigen Texteditor bearbeitet werden, jedoch bietet sich eine IDE mit einer guten Autovervollständigung für Typescript an. 
Ein kostenloser Editor mit herausragender Autovervollständigung ist beispielsweise [Visual Studio Code].
Nachdem das Programm heruntergeladen und installiert wurde, lässt sich unser überschaubares Projekt einfach als Ordner öffnen und direkt bearbeiten. 
Die Projektstruktur sollte folgendermaßen aussehen:

![Alt text](images/readme/projekt_struktur_1.png?raw=true "Title")

Wie zu sehen besteht das Projekt zur Zeit nur aus einer *package.json* und den heruntergeladenen Paketen im Ordner *node_modules*. 
Wir legen zwei weitere Ordner *src* und *test* für Quellcode und zugehörige Unit-Tests an. 
Zudem erstellen wir eine Datei namens *tsconfig.json* in der wir spezifizieren welche Typescript-Dateien (mit der Endung *.ts*) der eingebettete Transpiler von Visual Studio Code übersetzen soll:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*",
    "test/**/*"
  ]
}
```

Damit alle *.ts* nach jeder Änderung erneut transpiliert werden, konfigurieren wir einen Visual Studio spezifischen [Task].
Alternativ können wir auch das npm-Modul [tsc] global installieren und im *watch*-Modus starten:

```sh
$ npm install -g typescript
$ tsc --watch
```

Diese Methode funktioniert unabhängig von der verwendeten IDE. 


### Implementierung

Nun da alle Abhängigkeiten installiert sind und der Code automatisch nach jeder Änderung in Javascript umgewandelt wird, ist es an der Zeit, die erste User Story vorzustellen:

> User Story:
>
> "Als Nutzer eines *Taschenrechners* möchte ich *beliebig viele Zahlen* in Form einer *Zeichenkette* addieren können."

In Code ausgedrückt:

```typescript
calculator.add("1,2,3,4,5"); // => returns 15
```

Wir haben also ein Objekt *calculator* mit einer Methode *add*, die einen String aus komma-sepparierten Zahlen entgegennimmt, alle Zahlen aufaddiert und zurückliefert.


- Test zuerst
- Klasse erstellen (code beispiel)
- Refactoring => String Parser (single responsibility, widerverwendbarkeit, Wartbarkeit)

TODO:
- User Story vorstellen
- Test 
- List stub/mock
- Gedankengang mit Vergleich zu Umsetzung in Java/Typesript (später in Tabelle unten)
=> spread operator vs. for-schleife
- Refactoring

![Alt text](images/readme/uml_diagramm_2.png?raw=true "Title")
 
 TODO:
- User Story vorstellen
- Test 
- List stub/mock/dummy/spy
- Parser erweitern, reguläre ausdrücke
- Refactoring
- UML-Diagramm

TODO:
- User Story vorstellen
- Test 
- List stub/mock/dummy/spy
- typescript interfaces
- Refactoring

![Alt text](images/readme/uml_diagramm_3.png?raw=true "Title")


### Fazit

TODO

###  Überblick

Mit Unit-Tests testen wir ob unser eigener Code korrekt ist. 
Die Prüfung auf Korrektheit kann nur gewährleistet werden wenn der Code **isoliert** getestet wird.
Das heißt es müssen alle externen Klassen und Objekte, die mit unserem Code kommunizieren, durch *Test-Attrapen* ersetzt werden.
Somit kann ausgeschlossen werden, dass unsere Tests durch Seiteneffekte externer Module negativ beeinflusst werden.  

Den zu testenden Code nennt man auch *SUT* (= *System under Test*). 
In der folgenden Tabelle sind die vier verschiedenen Arten von Test-Attrappen und deren Interaktionen mit der SUT aufgelistet:

| Test-Attrappe | Alias | Beschreibung |
| ------ | ------ | ------|
| dummy object | dummy | muss lediglich vorhanden sein um compile-time Fehler zu vermeiden, ansonsten keine Funktion
| test stub | stub | dient als indirekter Input für die SUT
| test spy | spy | dient zur Verifizierung ob die SUT spezifische Methoden einer Klasse bzw. eines Objekts aufgerufen hat ("indirekte Outputs") 
| mock object | mock | verhält sich analog zum spy

In der Praxis gibt es diverse Frameworks die den Umgang mit Test-Attrapen erheblich vereinfachen.
Bei Java-Programmierern hat sich Mockito etabliert, wohingegen in der Javascript-Community großteils Sinon.js oder Jasmine eingesetzt wird. Die Syntax zur Erstellung von Test-Attrapen ist bei Mockito und Sinon.JS nahezu identisch wie folgende Tabelle zeigt:

| Mockito | Sinon.js | 
| ------ | ------ |
| Mockito.when(User.getName()).thenReturn("Alex"); | sinon.stub(user, 'getName').returns('Alex') |
| Mockito.spy(new User()); |  sinon.spy(user)|
| Mockito.mock(User.class); |  sinon.mock(user)|

#### Finales Projekt auschecken und ausführen

[npm]: <https://www.npmjs.com/>
[nodeJS]: <https://nodejs.org/en/>
[mocha]: <https://mochajs.org/>
[chai]: <http://chaijs.com/>
[Visual Studio Code]: <https://code.visualstudio.com/>
[Task]: <https://code.visualstudio.com/docs/languages/typescript>
[Typescript]: <https://www.typescriptlang.org/>
[tsc]: <https://www.typescriptlang.org/index.html#download-links>
[Transpiler]: <https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them>
[String Calculator]: <http://osherove.com/tdd-kata-1/>

```typescript
let s = "Typescript syntax highlighting";
```


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


