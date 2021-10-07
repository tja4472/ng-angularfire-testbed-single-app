import { expecter } from 'ts-snippet';

describe('JSON type', () => {
  const expectSnippet = expecter(
    (code) => `
      import { JSON } from './src/app/emulator/importDatabase';
  
      ${code}
    `
  );

  it('cannot be assigned to string', () => {
    expectSnippet(`
        const j1: JSON = 'a';
    `).toFail(/Type 'string' is not assignable to type 'JSON'/);
  });

  it('can be assigned to JSON object', () => {
    expectSnippet(`
        const j1: JSON = {
            field1: 'a',
            field2: 1,
            field3: {
                field1: 'a',
                field2: 1,
            },
            field4: null,
            field5: {},
        };
    `).toSucceed();
  });
});
