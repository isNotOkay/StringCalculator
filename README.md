


### Paketmanager und externe Module installieren

Zum Verwalten der Abhängigkeiten nutzen wir den Paketmanager [npm], der Bestandteil der populären JavaScript-Laufzeitumgebung [nodeJS] ist und eine riesige Palette an Javascript-Modulen beherbergt. 
Hierzu laden wir die aktuellste Version herunter ([Latest Features]) und tragen den Installationsordner in den Umgebungsvariablen ein.
Wir überprüfen ob die Installation erfolgreich war indem wir ein Kommandozeilenfenster öffnen und uns die Version anzeigen lassen:

```sh
 npm --version
```

> Hinweis: 
> Der Paketmanager und die Laufzeitumgebung sind zwei vollkommen verschiedene Programme. 
> Mittels der Laufzeitumgebung lässt sich Javascript außerhalb des Browsers ausführen wohingegen die Verantwortlichkeit des Paketmanagers darin besteht
> Abhängigkeiten aufzulösen und externe Pakete bei Bedarf herunterzuladen.


Zum initialisieren des Projekts erstellen wir einen neuen Ordner namens "string-calculator". Im neu angelegten Ordner rufen wir folgenden Befehl auf:

```sh
 npm init
```

Nachdem wir alle Eingabeaufforderungen bestätigt haben erzeugt der Paketmanager eine Datei namens *package.json*, welche zunächst nur allgemeine Metadaten enthält:

![Alt text](images/readme/package_json_1.png?raw=true "Title")

Mit der jetzt vorhandenen *package.json* können wir externe Pakete herunterladen und mit dem Zusatz *--save-dev* einmalig als Abhängigkeit registrieren. 
Für dieses Tutorial benötigen wir das Test-Framework [mocha] sowie die Assertion-Bibliothek [chai]:

```sh
 npm install --save-dev mocha
 npm install --save-dev chai
```

Zusätzlich müssen wir noch die Typdefinitionen der verwendeten Module installieren damit der Typescript-Transpiler keine Fehler anzeigt:

```sh
 npm install --save-dev @types/node
 npm install --save-dev @types/mocha
 npm install --save-dev @types/chai
```

Zum starten der Tests per Kommandozeile muss *mocha* noch als **globales** Modul installiert werden. 
Anschließend überprüfen wir die Installation indem wir die version ausgeben:

```sh
 npm install --global mocha
 mocha --version
```

> Hinweis:
>
> *mocha* besteht zum einen aus einer Bibliothek zur **Definition** von Test-Suites und -Cases und zum anderen aus einem Skript zur **Ausführung** von Tests.
> Indem wir *mocha* auch global installieren, können wir projektübergreifend per Kommandozeile Tests ausführen.



### Entwicklungsumgebung aufsetzen
Das Projekt kann im Prinzip mit jedem beliebigen Texteditor bearbeitet werden, jedoch bietet sich eine IDE mit einer guten Autovervollständigung für Typescript an. 
Ein kostenloser Editor mit guter Autovervollständigung ist beispielsweise [Visual Studio Code].
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

> Hinweis:
>
> Typdefinitionen sind in Typescript **optional**.
> Indem wir das Attribut *noImplicitAny* auf *true* setzen, zwingt uns der Transpiler immer einen Typ anzugeben.


Damit alle *.ts* nach jeder Änderung erneut transpiliert werden, konfigurieren wir einen Visual Studio spezifischen [Task].
Alternativ können wir auch das npm-Modul [tsc] global installieren und im *watch*-Modus starten. Dazu öffnen wir ein neues Konsolenfenster und geben folgende Befehle ein:

```sh
 npm install -g typescript
 tsc --watch
```

Diese Methode funktioniert unabhängig von der verwendeten IDE.   

> Hinweis:
>
> Wir sollten sicherstellen, dass immer nur *ein* Transpiler im Hintergrund aktiv ist.
> *Entweder* wir nutzen den eingebetteten Transpiler der verwendeten IDE *oder* starten *tsc* in einem separaten Konsolenfenster. 

### Mocha Grundgerüst

```typescript
 describe('Test Suite', () => {
    // SUT (= system under test, Objekt das getestet werden soll)
    let db: Database;

    before(() => {
      // Setup
    });

    it('Test Case', () => {
      // Arrange (test-spezifische Objekte wie bspw. stubs/mocks/spies initialisieren)
      // Act (für Test relevante Methoden der SUT ausführen)
      // Assert (Testergebnis validieren)
    });

    after(() => {
      // Cleanup
    });
  });
```

Wie bei Test-Frameworks üblich existieren in Mocha *Test-Suites* und *Test-Cases*.
* *describe*-Blöcke entsprechen bei JUnit einer mit *@Suite* annotierten Klasse
* *it*-Blöcke entsprechen bei Junit einer mit *@Test* annotierten Klasse

Weiterhin gibt es *before*- und *after*-Blöcke, die analog zu Junit zum initialisieren/zurücksetzen allgemeiner Bedingungen dienen.

### Implementierung

Nun da das Grundgerüst eines Unit-Tests vorgestellt wurde, alle Abhängigkeiten installiert sind und der Code automatisch nach jeder Änderung in Javascript umgewandelt wird, ist es an der Zeit, die erste User Story vorzustellen.

#### Erste Iteration

> User Story:
>
> "Als Nutzer eines *Taschenrechners* erwarte ich bei Eingabe einer Zahl in Form eines Strings, dass das Ergebnis eben diese Zahl ist."

In Code ausgedrückt:

```typescript
calculator.add('1'); // => returns 1
```

Wir schreiben einen ersten Test:

```typescript
import { expect } from 'chai';

describe('StringCalculator', () => {
    // SUT
    let calculator: StringCalculator;

    before(() =>  {
        calculator = new StringCalculator();
    });

    it('soll bei eingabe "1" das ergebnis 1 zurückgeben', () => {
        let result = calculator.add('1'); // Act
        expect(result).to.equal(1); // Assert
    });
});
```

Zunächst importieren wir die Eigenschaft *expect* des Moduls *chai* mittels standardmäßiger ES6-Syntax. 
Da sich *chai* innerhalb des Ordners *node_modules* befindet ist es ausreichend lediglich den Modulnamen anzugeben.

Per *describe*-Block definieren wir eine **Test-Suite** namens "StringCalculator", die als zweiten Parameter eine Funktion erwartet.
Innerhalb der übergebenen Funktion werden die eigentlichen **Test-Cases** in Form von von *it*-Blöcken definiert.
Aufgrund der kompakteren Schreibweise verwenden wir zur Deklaration der anonymen Funktionen sogenannte *arrow functions*:

```typescript
() => {} // arrow

function() {} // regulär
```

> Hinweis:
> 
> Innerhalb von *arrow functions* ändert sich die Semantik von "this"! [[1]]


Im Testfall selbst prüfen wir mit *chai*, dass die zukünftige *add*-Methode das gewünschte Ergebnis zurückliefert.
Das Schlüsselwort *let* deklariert den Gültigkeitsbereich der Variablen *calculator* und *result* als *block*, äquivalent zum Block-Scope von klassischen Programmiersprachen.

Der Test ist fertig, fehlt noch das *Grundgerüst* des Taschenrechners:

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

Wir führen den Test aus und gucken was passiert. 
Dazu geben wir im **Kommandozeilenfenster** folgenden Befehl ein:

```sh
 mocha
```


![Alt text](images/readme/failed_testcase_1.png?raw=true "Title")

Der Test schlägt wie zu erwarten fehl.
Wir **faken** die add-Methode, liefern eine 1 zurück und führen den Test erneut aus: 

```typescript
export class StringCalculator {
    add(stringOfNumbers: string) {
      return 1;
    }
}
```

Jetzt läuft der Testfall durch:

![Alt text](images/readme/passed_test_case_1.png?raw=true "Title")



#### Zweite Iteration

> User Story:
>
> "Als Nutzer eines *Taschenrechners* erwarte ich bei Eingabe eines Strings zweier Zahlen, dass das Ergebnis die Summe beider Zahlen ist."

Wir fügen unserer Test Suite einen weiteren Test hinzu, der die Addition von Zeichenketten mit zwei Zahlen prüft. 
Dabei separieren wird ie Zahlen per Komma:

```typescript
describe('StringCalculator', () => {
    // SUT
    let calculator: StringCalculator;

    before(function () {
        calculator = new StringCalculator();
    });

    it('soll bei eingabe "1" das ergebnis 1 zurückgeben', () => {
        let result = calculator.add('1');
        expect(result).to.equal(1);
    });

    it('soll bei eingabe "1,2" das ergebnis 3 zurückgeben', () => {
        let result = calculator.add('1,2');
        expect(result).to.equal(3);
    }); 
});
```

Der neue Test Case schlägt zunächst fehl, weil immer eine 1 zurückgeliefert wird:

![Alt text](images/readme/failing_test_case_2.png?raw=true "Title")

Das Verhalten der *add*-Methode muss angepasst werden, um die Addition zweier zahlen zu ermöglichen. 
Eine Implementierung könnte wie folgt aussehen:

```typescript
export class StringCalculator {
    add(stringOfNumbers: string) {
        let numbers = stringOfNumbers.split(',');
        let number1: number = parseInt(numbers[0]);
        let number2: number = parseInt(numbers[1]);

        if (number2) 
            return number1 + number2;
            
        return number1;
    }
}
```

Die *split*-Methode erstellt anhand des übergenen Trennzeichens (hier: Komma) ein Array aus Substrings:

```typescript
['1,2'].split(',') // [1,2]
```

Die Substrings werden per *parseInt* in Zahlen umgewandelt und zurückgeliefert. 
Da *number* als Datentyp angegeben ist, kreidet uns die IDE sofort einen Fehler an wenn wir die explizite Umwandlung auslassen.
Falls die übergebene Zeichenkette aus zwei Zahlen besteht wird eine Addition durchgeführt. 
Ansonsten wird die erste und einzige Zahl unverändert zurückgegeben. Beide Tests sind wieder grün:

![Alt text](images/readme/test_success_3.png?raw=true "Title")


Bisher haben wir eine Test-Klasse *StringCalculator.spec.ts* , die den Taschenrechner *StringCalculator.ts* (= **SUT**) mit **direkten Eingaben** in Form einer komma-separierten Zeichenkette versorgt und als **direkte Ausgabe** die Summe der übergebenen Zahlen zurückbekommt.
Verallgemeinert in folgendem Diagramm dargestellt:

![Alt text](images/readme/unit_test_interactions_state_testing.png?raw=true "Title")



Unsere Tests bestätigen uns, dass der Code korrekt funktioniert, jedoch verletzen wir das Single-Responsibility-Prinzip.
Die *add*-Methode des Taschenrechners führt sowohl das *Parsen* des Eingabeparameters als auch die eigentliche *Kalkulation* durch. 
Sie besitzt also zwei Verantwortlichkeiten die im Rahmen der Refatcoring-Phase voneinander getrennt werden sollten.

Diesbezüglich lagern wir das Parsen in eine externe Klasse namens *StringParser* aus und nutzen diesen in unser Taschenrechner-Klasse:
Das Klassendiagramm sieht nun folgendermaßen aus:


![Alt text](images/readme/uml_diagramm_2.png?raw=true "Title")


Zuvor haben wir lediglich den *state* des Taschenrechners getestet.
Jetzt müssen wir auch die **Kommunikation** zwischen Taschenrechner und Parser, einer externen Abhängigkeit, testen.

Der Parser nimmt **indirekte Ausgaben** des Taschenrechners als komma-separierte Zahlen in Form einer Zeichenkette entgegen und liefert ein Array aus komma-separierten Zahlen als **indirekte Eingaben** zurück. 
Aufgrund der indirekten Eingaben und Ausgaben wird er im englischen auch **DOC** (= dependent upon document) genannt.
Das Diagramm für unser Testszenario wird entsprechend um die Interaktion mit **DOCs** (dargestellt als *A*, *B*, *C* und *D*) ergänzt:

![Alt text](images/readme/unit_test_interaction_testing.png?raw=true "Title")

Damit der Code unseres Unit-Tests nach wie vor **isoliert** getestet werden kann, müssen alle DOCs durch Test-Attrapen ersetzt werden.
In unserem Beispiel ist das lediglich der Parser.

Wir passen unsere Tests an die neuen Gegebenheiten an und *mocken* den Parser mit Hilfe von Sinon.js:

```sh
 npm install --save-dev sinon
 npm install --save-dev @types/sinon
```

Die *package.json* sollte *sinon* und die zugehörige Typdefinition *@types/sinon* als weitere Abhängigkeiten auflisten:

![Alt text](images/readme/sinon_typdefinition_package_json.png?raw=true "Title")

Wir importieren sinon in *string-calculator.spec.ts* und führen das Refactoring durch:
 
```typescript
import {expect} from 'chai';
import {stub} from 'sinon';
import {StringCalculator} from '../src/StringCalculator';
import {StringParser} from '../src/StringParser';

describe('StringCalculator', () => {
  // SUT
  let calculator: StringCalculator;
  // DOC
  let stringParser: any;

  before(function () {
    stringParser = new StringParser();
    calculator = new StringCalculator(stringParser);

    // stringParser stubben und inputs/outputs von "parse" definieren
    stub(stringParser, 'parse')
      .withArgs('1').returns([1])
      .withArgs('1,2').returns([1, 2]);
  });

  it('soll bei eingabe "1" das ergebnis 1 zurückgeben', () => {
    let result = calculator.add('1'); // act
    expect(stringParser.parse.called).to.equal(true); // verify
    expect(result).to.equal(1);  
  });

  it('soll bei eingabe "1,2" das ergebnis 3 zurückgeben', () => {
    let result = calculator.add('1,2');
    expect(stringParser.parse.called).to.equal(true); // verify
    expect(result).to.equal(3);
  });

  afterEach(() => {
    stringParser.parse.called = false; // Anzahl Aufrufe von "parse" auf 0 setzen
  });
});
```

Im before-Block erstellen wir eine neue Instanz des *StringParsers*, stubben die *parse*-Methode und übergeben das instanziierte Objekt als Argument an den *StringCalculator*.
Der Konstruktor mit einem Parameter existiert noch nicht und wird nach dem Refactoring des Tests hinzugefügt!
Die gestubbte Methode *parse* des Objekts *stringParser* verfügt nun über weitere sinon-spezifische Methoden und Eigenschaften, wie bspw. *called*.
Mit dieser Eigenschaft können wir **verifizieren** ob *parse* von *add* aufgerufen wurde.

Bisher haben wir sichergestellt, dass der Taschenrechner Zeichenketten mit einer Länge von 1 und 2 addieren kann. 
Wie sieht es jedoch mit einer beliebigen Länge aus?
Wir fügen einen Test-Case mit einer Zeichenkette der Länge 3 hinzu... 

```typescript
  it('soll bei eingabe "1,2,3" das ergebnis 6 zurückgeben', () => {
         let result = calculator.add('1,2,3');
         expect(stringParser.parse.called).to.equal(true); // verify
         expect(result).to.equal(6);
    });
 ```  
 ... erweitern den stub ...
```typescript
  before(function () {
     stringParser = new StringParser();
     calculator = new StringCalculator(stringParser);
 
     // stringParser stubben und inputs/outputs von "parse" definieren
     stub(stringParser, 'parse')
       .withArgs('1').returns([1])
       .withArgs('1,2').returns([1, 2])
       .withArgs('1,2,3').returns([1, 2, 3]);
   });
```

...und bemerken, dass wir die Logik der *add*-Methode überarbeiten müssen:

![Alt text](images/readme/failing_test_case_laenge_3.png?raw=true "Title")

Wir summieren alle Zahlen mit einer einfachen for-Schleife:

```typescript
add(stringOfNumbers: string) {
    let numbers = this.stringParser.parse(stringOfNumbers);
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
      sum += parseInt(numbers[i]);
    }
    return sum;
  }
```   

Alle Tests laufen jetzt erfolgreich durch:


![Alt text](images/readme/passed_test_case_4.png?raw=true "Title")
 
 
Bevor wir uns um die nächste User Story kümmern, passen wir den neu erstellen Code in der *Refactoring-Phase* noch etwas an.
Für das Aufsummieren der Werte bietet sich die *reduce*-Methode von Arrays an, eine von mehreren nützlichen [Collection-Methoden]:

```typescript
  add(stringOfNumbers: string) {
    let numbers = this.stringParser.parse(stringOfNumbers);
    return numbers.reduce((sum, currentValue) => {
      return sum + parseInt(currentValue);
    }, 0);
  }
```
Der Code ist etwas kompakter und die Tests weiterhin alle erfolgreich.

#### Dritte Iteration

> User Story:
>
> "Als Nutzer eines *Taschenrechners* erwarte ich bei Eingabe eines leeren Strings das Ergebnis 0".

Wir schreiben einen neuen Test:

```typescript
  it('soll bei eingabe eines leeren Strings "" das ergebnis 0 zurückgeben', () => {
    let result = calculator.add('');
    expect(stringParser.parse.called).to.equal(true);
    expect(result).to.equal(0);
  });
```

Die Implementierung des Parsers ist für unseren Test weiterhin uninteressant. 
Uns interessiert nur das Verhalten des Taschenrechners, weshalb wir die gestubbte *parse*-Methode wie folgt erweitern:

```typescript
  before(function () {
    stringParser = new StringParser();
    calculator = new StringCalculator(stringParser);

    // stringParser stubben und inputs/outputs von "parse" definieren
    stub(stringParser, 'parse')
      .withArgs('').returns([0])
      .withArgs('1').returns([1])
      .withArgs('1,2').returns([1, 2])
      .withArgs('1,2,3').returns([1, 2, 3]);
  });
```

Bei Eingabe eines leeren Strings wird uns der Parser ein Array mit einer Null (= "[0]") zurückliefern.

Wir prüfen ob unsere bisherige Implementierung den neuen Testfall abdeckt:

![Alt text](images/readme/unit_test_success_6.png?raw=true "Title")

Alle Tests sind grün, der Code der add-Methode muss nicht weiter angepasst werden. Wir können nun beliebig viele Zahlen addieren.


An dieser Stelle beenden wir den TDD-Zyklus und betrachten im nächsten Abschnitt weitere nützliche Typescript-Features anhand konkreter Beispiele.
Als gute Übung eignet sich die Erweiterung des Taschenrechners um **alle vier** Grundrechenarten.

### Erweiterung des Klassenmodells

Nehmen wir an es existiert folgende User Story:

> User Story:
>
> "Als Nutzer eines *Taschenrechners* möchte ich Zahlen in Form eines *Json-Strings* addieren"

Dann könnte der Nutzer beispielsweise folgenden Json-String übergeben und als Resultat die Summe der Werte *x1*, *x2* und *x3* erhalten:

```json
{
  "numbers": [
      {"x1": 8},
      {"x2": 11},
      {"x3": 14}
   ]
 }
```
=> result: 33

Wir bräuchten also einen weiteren Parser, der den Json-String in ein Array aus Zahlen umwandelt.
Beide Parser hätten die gleiche Schnittstelle *parse* und würden sich lediglich in der Implementierung unterscheiden.
Sie wären also vom gleichen *Typ* und überall dort, wo ein *StringParser* verlangt wird, könnte auch ein *JsonParser* verwendet werden:


![Alt text](images/readme/uml_diagramm_mit_json_parser.png?raw=true "Title")


#### Strukturelle und nominelle Typerkennung

Neben Klassen bietet Typescript ein weiteres, aus klassischen Programmiersprachen bekanntes Strukturierungselement an: **Interfaces**.
Wer Java-Interfaces kennt sollte sich mit der Syntax zur Erstellung von Interfaces in Typescript problemlos anfreunden können:

```typescript
interface Parser {
    parse(numberOfStrings: string): string[]
}
```

> Hinweis:
>
> Anders als in Java können Interfaces in Typescript neben Methoden auch *Eigenschaften* vorgeben.

Analog zu Java sieht auch die Implementierung des Interfaces per *implements* aus:

```typescript
export class StringParser implements StringParser{
    parse(stringOfNumbers: string): string[] {
        return [''];
    }
}
```

Typescript realisiert Interfaces mittels *Duck Typing*, einem Konzept funktionaler Programmiersprachen.
Beim Duck Typing wird der Typ eines Objekts anhand seiner Struktur, den **Eigenschaften und Methoden**, spezifiziert.
Dementsprechend ist für den Transpiler folgendes Objektliteral vom Typ *Parser* obwohl es weder eine Instanz von *StringParser* noch eine Instanz von *JsonParser* ist:

```typescript
let parser = {
	parse: function(numberOfStrings: string): string[] {}
}
new StringCalculator(parser); // OK
```

Ändern wir beispielsweise den Rückgabetyp der Methode von *string* auf *number*, stimmt die Struktur nicht mehr mit dem *Parser*-Interface überein und es wird ein Fehler angezeigt:

```typescript
let parser = {
	parse: function(numberOfStrings: string): number[] {}
}
new StringCalculator(parser); // Fehler
```

TODO:
- Hinweis, dass aus clean-Code Perspektive Objektliterale aufgrund von Code-Duplizierung schlechter sind als bspw. Verwendung von typen mit "new"
- Beispiel zur strukturellen Typerkennung und worauf man achten muss
- Link zum Artikel aus der Informatik Aktuell

> Hinweis:
>
> In Java werden Typen anhand des *Namens* eines Interfaces erkannt.
> Diese Form der Typisierung wird [nominal] genannt und steht im Gegensatz zur strukturellen Typerkennung.


###  Zusammenfassung 

Der finale Quellcode  kann den Ordnern *src* und *test* entnommen werden.

### Exkurs Unit-Tests

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
Bei Java-Programmierern hat sich [Mockito] etabliert, wohingegen in der Javascript-Community großteils [Sinon.js] oder [Jasmine] eingesetzt wird. 


### Java/Typescript Cheat-Sheet

Todo:
- in Tabelle auf objektliterale eingehen
=> in Java stattdessen anonyme Klassen?
=> Beispiel mit Katze, Hund und wie strukturelle Interfaces in Typescript funktionieren

Siehe cheat-sheet.html

[npm]: <https://www.npmjs.com/>
[nodeJS]: <https://nodejs.org/en/about/>
[Latest Features]: <https://nodejs.org/en/>
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
[1]: <https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen#Keine_Bindung_von_this>
[nominal]: <https://medium.com/@thejameskyle/type-systems-structural-vs-nominal-typing-explained-56511dd969f4#.xjl4wbxfv>
[Mockito]: <http://site.mockito.org/>
[Jasmine]: <https://jasmine.github.io/>
[Sinon.js]: <http://sinonjs.org/>
[Collection-Methoden]: <http://learnjsdata.com/iterate_data.html>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


