


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
Der erste Test besteht darin, bei Übergabe eines Strings mit nur einer Zahl, eben nur diese Zahl zurückzugeben:

```typescript
import { expect } from 'chai';

describe('StringCalculator', () => {
    let calculator;

    before(() =>  {
        calculator = new StringCalculator();
    });

    it('soll bei eingabe "1" das ergebnis 1 zurückgeben', () => {
        let result = calculator.add('1');
        expect(result).to.equal(1);
    });
});
```

Zunächst importieren wir die Eigenschaft *expect* des Moduls *chai* mittels standardmäßiger ES6-Syntax. 
Da sich *chai* innerhalb des Ordners *node_modules* befindet, ist es ausreichend lediglich den Modulnamen anzugeben.

Per *describe*-Block definieren wir eine Test-Suite namens "StringCalculator", die als zweiten Parameter eine Funktion erwartet.
Innerhalb der übergebenen Funktion werden die eigentlichen Test-Cases in Form von von *it*-Blöcken definiert.
Aufgrund der kompakteren Schreibweise verwenden wir zur Deklaration der anonymen Funktionen sogenannte *arrow functions* ("=>").

> Hinweis:
> 
> Innerhalb von *arrow functions* ändert sich die Semantik von "this"! [[1]]


Wie bei Test-Frameworks üblich existieren before- und after-Blöcke zum initialisieren/zurücksetzen testspezifischer Vorbedingungen.
Wir nutzen den *before*-Block zur Instanziierung eines Taschenrechners, unserer *SUT*. 
Im Testfall selbst prüfen wir mit *chai*, dass die zukünftige *add*-Methode das gewünschtes Ergebnis zurückliefert.
Das Schlüsselwort *let* deklariert den Gültigkeitsbereich der Variablen *calculator* und *result* als *block*, äquivalent zum Block-Scope von klassischen Programmiersprachen.


Der Test ist fertig, fehlt noch die Implementierung des Taschenrechners:

```typescript
export class StringCalculator {
    add(stringOfNumbers: string) {
    }
}
```

Typescript-Klassen haben, wie in Java auch, einen Default-Constructor der nicht explizit angegeben werden muss.
Das Schlüsselwort *export* ist zwingend notwendig, damit *StringCalculator* von externen Modulen importiert werden kann.
Als Typ für den Parameter der Methode *add* nehmen wir wie zuvor spezifiziert *string*.
Anders als bei Javascript wird bei Verwendung eines falschen Datentyps ein Fehler in der IDE angezeigt.
Neben *string* gibt es noch einige weitere [Basisdatentypen].
Zum Schluss fügen wir noch ein Import-Statement in unserer *string-calculator.spec.js* ein. 
Weil es sich beim *StringCalculator* um eine eigens angelegte Klasse handelt müssen wir einen *relativen* Pfad angeben:
 
```typescript
import { StringCalculator } from '../src/StringCalculator';
```

Wir führen den Test aus und gucken was passiert:

```sh
$ mocha
```


![Alt text](images/readme/failed_testcase_1.png?raw=true "Title")

Der Test schlägt wie zu erwarten fehl.
Wir liefern eine 1 zurück und führen den Test erneut aus: 

```typescript
export class StringCalculator {
    add(stringOfNumbers: string) {
      return 1;
    }
}
```

Jetzt läuft der Testfall durch:

![Alt text](images/readme/passed_test_case_1.png?raw=true "Title")





TODO:
- User Story vorstellen
- Test 
- List stub/mock
- Gedankengang mit Vergleich zu Umsetzung in Java/Typesript (später in Tabelle unten)
=> spread operator vs. for-schleife
- Refactoring
- Refactoring => String Parser (single responsibility, widerverwendbarkeit, Wartbarkeit)
- 

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
[Basisdatentypen]: <https://www.typescriptlang.org/docs/handbook/basic-types.html>
[arrow functions]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions>
[1]: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen#Keine_Bindung_von_this>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


