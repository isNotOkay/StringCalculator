import {JsonParser}  from '../src/JsonParser';
import {expect} from 'chai';


describe('JSON Parser', () => {
    let jsonParser: JsonParser;

    beforeEach(function () {
        jsonParser = new JsonParser();
    });


    it(' should parse valid JSON', () => {
        console.log(expect);
        let result = 123;
        let json: String = jsonParser.parse(result);
        expect(json).to.be.equal('{result: 123}');
    });
});