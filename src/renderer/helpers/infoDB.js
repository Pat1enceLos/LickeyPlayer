import { openDb } from 'idb';
import { includes } from 'lodash/includes';
import {
  INFO_DB_VERSION as currentVersion,
  INFO_DB_NAME,
  INFO_DB_SCHEMA as schema,
} from '../global/db';

const currentSchema = schema.find(({ version }) => version === currentVersion).schema;

export class InfoDB {
  // #db;
  // #version;
  // #schema;
  /**
   * Create InfoDB if doesn't exist
   * Update InfoDB if new schema or new index has added
   */
  constructor(version, schema) {
    this.version = version;
    this.schema = schema;
  }

  static async getDB(version, schema) {
    console.log(schema);
    return openDb(INFO_DB_NAME, version, (upgradeDB) => {
      schema.forEach(({ name, options, indexes }) => {
        if (!upgradeDB.objectStoreNames.contains(name)) {
          const store = upgradeDB.createObjectStore(name, options);
          indexes.forEach(({ name, options }) => {
            if (name) store.createIndex(name, name, options);
          });
        } else {
          const store = upgradeDB.transaction.objectStore(name);
          const { indexNames } = store;
          const indexesToDelete = Array.from(indexNames)
            .filter(name => !includes(indexes, name));
          indexesToDelete.forEach(store.deleteIndex);

          const indexesToCreate = indexes
            .filter(({ name }) => !indexNames.contains(name));
          indexesToCreate
            .forEach(({ name, keyPath, options }) => store.createIndex(name, keyPath, options));
        }
      });
    });
  }

  async getOwnDb() {
    if (this.db) return this.db;
    this.db = await InfoDB.getDB(this.version, this.schema);
    return this.db;
  }

  async get(objectStoreName, key, val) {
    const db = await this.getOwnDb();
    if (val) {
      return db
        .transaction(objectStoreName)
        .objectStore(objectStoreName)
        .index(key)
        .get(val);
    }
    return db
      .transaction(objectStoreName)
      .objectStore(objectStoreName)
      .get(key);
  }

  async add(objectStoreName, data) {
    const db = await this.getOwnDb();
    const { objectStoreNames } = db;
    if (!objectStoreNames.contains(objectStoreName)) {
      throw new Error(`ObjectStore ${objectStoreName} does not exist. Add them to constant.js please.`);
    }
    const tx = db.transaction(objectStoreName, 'readwrite');
    try {
      const newKey = await tx.objectStore(objectStoreName).add(data);
      await tx.complete;
      return newKey;
    } catch (err) { throw err; }
  }
  async put(objectStoreName, data) {
    const db = await this.getOwnDb();
    const { objectStoreNames } = db;
    if (!objectStoreNames.contains(objectStoreName)) {
      throw new Error(`ObjectStore ${objectStoreName} does not exist. Add them to constant.js please.`);
    }
    const tx = db.transaction(objectStoreName, 'readwrite');
    try {
      const newKey = await tx.objectStore(objectStoreName).put(data);
      await tx.complete;
      return newKey;
    } catch (err) { throw err; }
  }

  async delete(objectStoreName, keyPathVal) {
    const db = await this.getOwnDb();
    const { objectStoreNames } = db;
    if (!objectStoreNames.contains(objectStoreName)) {
      throw new Error(`ObjectStore ${objectStoreName} does not exist. Add them to constant.js please.`);
    }
    const tx = db.transaction(objectStoreName, 'readwrite');
    tx.objectStore(objectStoreName).delete(keyPathVal);
    return tx.complete;
  }

  async getAll(objectStoreName, keyRange) {
    const db = await this.getOwnDb();
    const tx = db.transaction(objectStoreName);
    if (keyRange) {
      return tx.objectStore(objectStoreName).getAll(keyRange);
    }
    return tx.objectStore(objectStoreName).getAll();
  }
}

export default new InfoDB(currentVersion, currentSchema);
