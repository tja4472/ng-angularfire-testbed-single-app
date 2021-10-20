/**
 * ```ts
 * type t1 = {
 *   field1: string;
 *   __collection: Collection<{ field2: string }>;
 * };
 *
 * const c1: Collection<t1> = {
 *   docId1: {
 *     field1: 'a',
 *     __collection: {
 *       docIdA: { field2: 'a' },
 *       docIdB: { field2: 'a' },
 *     },
 *   },
 *   docId2: {
 *     field1: 'a',
 *     __collection: {
 *       docIdA: { field2: 'a' },
 *       docIdB: { field2: 'a' },
 *     },
 *   },
 * };
 * ```
 */
export type Collection<T> = {
  [DocumentKey: string]: T;
};

export type ImportDocument = Record<string, unknown>;

export type ImportCollection = { [key: string]: ImportDocument };

export type ImportDatabase = { [key: string]: ImportCollection };

/**
 * Represents a Firestore database.
 */
export type FirestoreDatabase = { [key: string]: FirestoreCollection };

/**
 * Represents a Firestore collection.
 */
export type FirestoreCollection = { [key: string]: FirestoreDocument };

export type FirestoreDocument = {
  [key: string]: FirestoreField | FirestoreCollection;
};

// document = fields & collections

const database: FirestoreDatabase = {
  col1: {
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

export type FirestoreField =
  | string
  | number
  | boolean
  | null
  | { [key: string]: FirestoreField };

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

function omit(key: any, obj: any) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

// function database(array of col) returns Database

//   col1: <FirestoreCollection>{},
// col<DocType>('col1', {});

/**
 * ```ts
 * const j1: JSON = {
 *   field1: 'a',
 *   field2: 1,
 *   field3: {
 *     field1: 'a',
 *     field2: 1,
 *   },
 *   field4: null,
 *   field5: {},
 * };
 * ```
 */
export type JSON = { [key: string]: string | number | boolean | null | JSON };

// const j1:Json1 = 'a'; // this should fail.
// const j1:Json1 = null;

const j2: JSON = { a: 'A' };
const j3: JSON = {
  doc_B_field1: 'field1-B1',
  doc_B_field2: 2,
  favorites: {
    food: 'Pizza',
    color: null,
    subject: 'Recess',
    aa: {
      food: 'Pizza',
    },
  },
};

// const isObject = (obj: any) => obj === Object(obj);

function isCollection(fieldName: string): boolean {
  return fieldName.substr(0, 2) === '__';
}

export function removeCollections(fields: NonNullable<ImportDocument>) {
  let result = fields;

  // if(fields === null) { return null;}

  Object.keys(fields).forEach((field) => {
    if (isCollection(field)) {
      result = omit(field, result);
    }
  });
  /*
for (const key in fields){}

  for (const [field, v] of Object.entries(fields)) {
    // console.log('A>', field);

    if (isCollection(field)) {
      result = omit(field, result);
    }
  }
*/
  return result;
}

/**
 * # Data expected
 *
 * ## documentPath:
 * '/collectionA/documentA1'
 *
 * ## documentFields:
 * ```json
 * {
 *     field1: 'a',
 *     field2: 1,
 *     field3: {
 *         field1: 'a',
 *         field2: 1,
 *     },
 *     field4: null,
 *     field5: {},
 * }
 *```
 */
export type SaveFunction = (
  documentPath: string,
  document: NonNullable<ImportDocument>
) => Promise<void>;

async function processCollection(
  parentPath: string,
  collectionName: string,
  collection: NonNullable<ImportCollection>,
  saveFn: SaveFunction
) {
  const dbCollectionName = collectionName.substr(2);

  for (const [documentId, document] of Object.entries(collection)) {
    if (document === null) return;

    const documentPath = `${dbCollectionName}/${documentId}`;

    const objectToSave = removeCollections(document);
    await saveFn(`${parentPath}/${documentPath}`, objectToSave);

    for (const [fieldName, v] of Object.entries(document)) {
      if (isCollection(fieldName)) {
        await processCollection(
          `${parentPath}/${documentPath}`,
          fieldName,
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          v as ImportCollection,
          saveFn
        );
      }
    }
  }
}

export async function importDatabase(
  database: ImportDatabase,
  saveFn: SaveFunction
) {
  for (const [collectionName, collection] of Object.entries(database)) {
    await processCollection('', collectionName, collection, saveFn);
  }
}
