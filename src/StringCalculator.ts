import {StringParser} from '../src/StringParser';

export class StringCalculator {
  stringParser: StringParser;

  constructor(stringParser: StringParser) {
    this.stringParser = stringParser;
  }


  add(stringOfNumbers: string) {
    let numbers = this.stringParser.parse(stringOfNumbers);

    if (numbers.length === 0) return 0;

    return numbers.reduce((sum, currentValue) => {
      return sum + parseInt(currentValue);
    }, 0);
  }


  /*  return numbers.reduce((sum, currentValue) => {
   return sum + parseInt(currentValue);
   }, 0);*/

}
