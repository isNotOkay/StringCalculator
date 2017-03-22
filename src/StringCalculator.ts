import {StringParser} from '../src/StringParser';

export class StringCalculator {
  stringParser: StringParser;

  constructor(stringParser: StringParser) {
    this.stringParser = stringParser;
  }

  // TODO:
  // - an länge gleich 0 anpassen
  add(stringOfNumbers: string) {
    let numbers = this.stringParser.parse(stringOfNumbers);
    return numbers.reduce((sum, currentValue) => {
      return sum + parseInt(currentValue);
    }, 0);
  }
}
