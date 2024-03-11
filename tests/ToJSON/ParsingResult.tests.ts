import { expect } from 'chai';
import { ParseText } from '../../src/ToJSON/parsing/parsing';

describe('Get result', () => {
  it('Includes the result and statistics', () => {
    let testData = `
            0 @I1@ INDI
            1 NAME John /Doe/
            1 OCCU Scholar
            0 TRLR
        `
      .trimStart()
      .trimEnd();

    let options = `
            Definition:
              - Tag: INDI
                CollectAs: Individuals
                CollectAsArray: true
                Property: Id
                Properties:
                  - Tag: NAME
                    Property: Fullname
                  - Tag: OCCU
                    Property: Occupation`;

    const result = ParseText(testData, options);
    expect(result).to.deep.equal({
      Object: {
        Individuals: [
          {
            Id: '@I1@',
            Fullname: 'John /Doe/',
            Occupation: 'Scholar',
          },
        ],
      },
      Statistics: {
        IncorrectLines: [],
        NotParsedLines: [],
        NotParsedLinesWithoutGEDCOMTag: [],
        ParsedLines: [
          {
            Line: '0 @I1@ INDI',
            LineNumber: 1,
            Text: undefined,
          },
          {
            Line: '1 NAME John /Doe/',
            LineNumber: 2,
            Text: undefined,
          },
          {
            Line: '1 OCCU Scholar',
            LineNumber: 3,
            Text: undefined,
          },
          {
            Line: '0 TRLR',
            LineNumber: 4,
            Text: undefined,
          },
        ],
      },
    });
  });
});
