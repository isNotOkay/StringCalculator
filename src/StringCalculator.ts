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
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
      sum += parseInt(numbers[i]);
    }
    return sum;
  }



  /*  return numbers.reduce((sum, currentValue) => {
      return sum + parseInt(currentValue);
    }, 0);*/

}
