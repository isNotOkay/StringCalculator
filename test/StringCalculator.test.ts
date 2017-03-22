import {expect} from 'chai';
import * as sinon from 'sinon';
import {StringCalculator} from '../src/StringCalculator';
import {StringParser} from '../src/StringParser';

describe('StringCalculator', () => {
  let calculator: StringCalculator;
  // Keine Typangabe, da wir stringParser stubben.
  // Ist danach ein "Hybrid" aus den Typen StringParser und SinonStub)
  let stringParser: any;

  before(function () {
    stringParser = new StringParser();
    calculator = new StringCalculator(stringParser);

    // stringParser stubben und inputs/outputs von "parse" definieren
    sinon.stub(stringParser, 'parse')
      .withArgs('1').returns([1])
      .withArgs('1,2').returns([1, 2])
      .withArgs('1,2,3').returns([1, 2, 3]);
  });

  it('soll bei eingabe "1" das ergebnis 1 zurückgeben', () => {
    let result = calculator.add('1');
    expect(stringParser.parse.called).to.equal(true);
    expect(result).to.equal(1);
  });

  it('soll bei eingabe "1,2" das ergebnis 3 zurückgeben', () => {
    let result = calculator.add('1,2');
    expect(stringParser.parse.called).to.equal(true);
    expect(result).to.equal(3);
  });

  it('soll bei eingabe "1,2,3" das ergebnis 6 zurückgeben', () => {
    let result = calculator.add('1,2,3');
    expect(stringParser.parse.called).to.equal(true);
    expect(result).to.equal(6);
  });

  afterEach(() => {
    stringParser.parse.called = false; // Anzahl Aufrufe von "parse" auf 0 setzen
  });
});
