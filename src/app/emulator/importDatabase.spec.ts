/**
 * @jest-environment node
 *
 * Required for Firebase
 *
 */
import { Collection, importDatabase } from './importDatabase';

import { expecter } from 'ts-snippet';

describe('ts-snippet tests', () => {
  const expectSnippet = expecter(
    (code) => `
      import { Collection, JSON, FirestoreDatabase, FirestoreField, FirestoreDocument, FirestoreCollection } from './src/app/emulator/importDatabase';
    
      type Doc1 = {
        f1: number;
        f2: string;
      };

      ${code}
    `
  );

  it('FirestoreField', () => {
    expectSnippet(`
    const f1: FirestoreField = 0;
    const f2: FirestoreField = 'a';
    const f3: FirestoreField = false;
    const f4: FirestoreField = null;
    const f5: FirestoreField = {
        a: 0,
        b: 'a',
        c: true,
        d: null,
        e: {
            a: 0,
            b: 'a',
            c: true,
            d: null,            
        }
    };

    `).toSucceed();
  });

  it('FirestoreDocument should fail [string]', () => {
    expectSnippet(`
        const j1:FirestoreDocument = 'a';   
    `).toFail(/Type 'string' is not assignable to type 'FirestoreDocument'/);
  });

  it('FirestoreDocument should fail [number]', () => {
    expectSnippet(`
        const j1:FirestoreDocument = 1;   
    `).toFail(/Type 'number' is not assignable to type 'FirestoreDocument'/);
  });

  it('FirestoreDocument should fail because of f1 in col2', () => {
    expectSnippet(`
    const d1:FirestoreDocument = {
        col2: <FirestoreCollection>{
            f1: 1,
            doc1: {
                f1: 1,
                f2: 'a',                    
            },
            doc2: {
                f1: 1,
                f2: 'a',                    
            },               
        },
    }; 
    `).toFail(/Type 'number' is not comparable to type 'FirestoreDocument'/);
  });

  it('FirestoreDocument should succeed', () => {
    expectSnippet(`
        const d1:FirestoreDocument = {};  
        const d2:FirestoreDocument = {
            f1: 1,
            f2: 'a',
            col1: {},
            col2: {
                doc1: {
                    f1: 1,
                    f2: 'a',                    
                },
                doc2: {
                    f1: 1,
                    f2: 'a',                    
                },               
            },
        };   
    `).toSucceed();
  });

  it('FirestoreCollection should fail [string]', () => {
    expectSnippet(`
        const j1:FirestoreCollection = 'a';   
    `).toFail(/Type 'string' is not assignable to type 'FirestoreCollection'/);
  });

  it('FirestoreCollection should fail [number, FirestoreDocument]', () => {
    expectSnippet(`
        const col2:FirestoreCollection = {
                f1: 1,
                doc1: {
                    f1: 1,
                    f2: 'a',                    
                },               
        };   
    `).toFail(/Type 'number' is not assignable to type 'FirestoreDocument'/);
  });

  it('FirestoreCollection should succeed', () => {
    expectSnippet(`
        const col2:FirestoreCollection = {
                doc1: {
                    f1: 1,
                    f2: 'a',                    
                },
                doc2: {
                    f1: 1,
                    f2: 'a',                    
                },               
        };   
    `).toSucceed();
  });

  it('FirestoreDatabase should fail [string]', () => {
    expectSnippet(`
        const j1:FirestoreDatabase = 'a';   
    `).toFail(/Type 'string' is not assignable to type 'FirestoreDatabase'/);
  });

  it('FirestoreDatabase should succeed', () => {
    expectSnippet(`
const database1: FirestoreDatabase = {
  col1: <Collection<Doc1>>{
    doc1: {
      f1: 1,
      f2: 'a',
    },
    doc2: {
      f1: 1,
      f2: 'a',
    },
  },
};              
    `).toSucceed();
  });

  it('FirestoreDatabase should fail [aaaaaa]', () => {
    expectSnippet(`
const database1: FirestoreDatabase = {
  col1: <Collection<Doc1>>{
    doc1: {
      f1: 1,
      f2a: 'a',
    },
    doc2: {
      f1: 1,
      f2: 'a',
    },
  },
};              
    `).toFail(
      /Property 'f2' is missing in type '{ f1: number; f2a: string; }' but required in type 'Doc1'./
    );
  });
});

// #region Database
type DocumentA = {
  doc_A_field1: string;
  doc_A_field2: number;
  __doc_A_collectionC: Collection<DocumentC>;
  __doc_A_collectionD: Collection<DocumentD>;
};

type Favorites = {
  food: string;
  color: string;
  subject: string;
};

type DocumentB = {
  doc_B_field1: string;
  doc_B_field2: number;
  favorites: Favorites;
};

type DocumentC = {
  doc_C_field1: string;
  doc_C_field2: number;
};

type DocumentD = {
  doc_D_field1: string;
  doc_D_field2: number;
};

type Database = {
  __collectionA: Collection<DocumentA>;
  __collectionB: Collection<DocumentB>;
};

const Database: Database = {
  // Collections prefixed by '__'.
  __collectionA: {
    documentA1: {
      doc_A_field1: 'field1-A1',
      doc_A_field2: 2,
      __doc_A_collectionC: {
        documentC1: {
          doc_C_field1: 'docC_field1-C1',
          doc_C_field2: 6,
        },
        documentC2: {
          doc_C_field1: 'docC_field1-C2',
          doc_C_field2: 6,
        },
      },
      __doc_A_collectionD: {
        documentD1: {
          doc_D_field1: 'docD_field1-D1',
          doc_D_field2: 6,
        },
      },
    },
    documentA2: {
      doc_A_field1: 'field1-A2',
      doc_A_field2: 2,
      __doc_A_collectionC: {},
      __doc_A_collectionD: {},
    },
    documentA3: {
      doc_A_field1: 'field1-A3',
      doc_A_field2: 2,
      __doc_A_collectionC: {},
      __doc_A_collectionD: {},
    },
  },
  __collectionB: {
    documentB1: {
      doc_B_field1: 'field1-B1',
      doc_B_field2: 2,
      favorites: {
        food: 'Pizza',
        color: 'Blue',
        subject: 'Recess',
      },
    },
  },
};
// #endregion

describe('test1', () => {
  it('test database', async () => {
    const mockSaveFn = jest.fn();
    await importDatabase(Database, mockSaveFn);
    expect(mockSaveFn.mock.calls.length).toBe(7);

    {
      const call = 0;
      const path = '/collectionA/documentA1';
      const expected: Omit<
        DocumentA,
        '__doc_A_collectionC' | '__doc_A_collectionD'
      > = {
        doc_A_field1: 'field1-A1',
        doc_A_field2: 2,
      };

      expect(mockSaveFn.mock.calls[call][0]).toBe(path);
      expect(mockSaveFn.mock.calls[call][1]).toStrictEqual(expected);
    }
    {
      const call = 1;
      const path = '/collectionA/documentA1/doc_A_collectionC/documentC1';
      const expected: DocumentC = {
        doc_C_field1: 'docC_field1-C1',
        doc_C_field2: 6,
      };
      expect(mockSaveFn.mock.calls[call][0]).toBe(path);
      expect(mockSaveFn.mock.calls[call][1]).toStrictEqual(expected);
    }
    {
      const call = 2;
      const path = '/collectionA/documentA1/doc_A_collectionC/documentC2';
      const expected: DocumentC = {
        doc_C_field1: 'docC_field1-C2',
        doc_C_field2: 6,
      };
      expect(mockSaveFn.mock.calls[call][0]).toBe(path);
      expect(mockSaveFn.mock.calls[call][1]).toStrictEqual(expected);
    }
    {
      const call = 3;
      const path = '/collectionA/documentA1/doc_A_collectionD/documentD1';
      const expected: DocumentD = {
        doc_D_field1: 'docD_field1-D1',
        doc_D_field2: 6,
      };
      expect(mockSaveFn.mock.calls[call][0]).toBe(path);
      expect(mockSaveFn.mock.calls[call][1]).toStrictEqual(expected);
    }
    {
      const call = 4;
      const path = '/collectionA/documentA2';
      const expected: Omit<
        DocumentA,
        '__doc_A_collectionC' | '__doc_A_collectionD'
      > = {
        doc_A_field1: 'field1-A2',
        doc_A_field2: 2,
      };

      expect(mockSaveFn.mock.calls[call][0]).toBe(path);
      expect(mockSaveFn.mock.calls[call][1]).toStrictEqual(expected);
    }
    {
      const call = 5;
      const path = '/collectionA/documentA3';
      const expected: Omit<
        DocumentA,
        '__doc_A_collectionC' | '__doc_A_collectionD'
      > = {
        doc_A_field1: 'field1-A3',
        doc_A_field2: 2,
      };

      expect(mockSaveFn.mock.calls[call][0]).toBe(path);
      expect(mockSaveFn.mock.calls[call][1]).toStrictEqual(expected);
    }
    {
      const call = 6;
      const path = '/collectionB/documentB1';
      const expected: DocumentB = {
        doc_B_field1: 'field1-B1',
        doc_B_field2: 2,
        favorites: {
          food: 'Pizza',
          color: 'Blue',
          subject: 'Recess',
        },
      };

      expect(mockSaveFn.mock.calls[call][0]).toBe(path);
      expect(mockSaveFn.mock.calls[call][1]).toStrictEqual(expected);
    }
  });
});
