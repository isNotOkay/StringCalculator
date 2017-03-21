
import { StringParser } from '../src/StringParser';

export class StringCalculator {
    stringParser: StringParser;
    constructor(stringParser: StringParser) {
        this.stringParser = stringParser;
    }

    add(stringOfNumbers: string) {
        let numbers = this.stringParser.parse(stringOfNumbers);
        let number1 = parseInt(numbers[0]);
        let number2 = parseInt(numbers[1]);

        if (number2)
            return number1 + number2;
        else
            return number1;
    }
}
