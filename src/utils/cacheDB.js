const DB_NAME = 'NewsAppCache';
const DB_VERSION = 1;
const STORE_NAME = 'newsCache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

class IndexedDBCache {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async ensureDB() {
    if (!this.db) {
      await this.init();
    }
  }

  async set(key, data) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const item = {
        key,
        data,
        timestamp: Date.now(),
      };
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async get(key) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          resolve(null);
          return;
        }

        const age = Date.now() - result.timestamp;
        if (age > CACHE_DURATION) {
          this.delete(key);
          resolve(null);
        } else {
          resolve(result.data);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async delete(key) {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear() {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearExpired() {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('timestamp');
      const request = index.openCursor();
      const now = Date.now();

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const age = now - cursor.value.timestamp;
          if (age > CACHE_DURATION) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };

      request.onerror = () => reject(request.error);
    });
  }
}

export const dbCache = new IndexedDBCache();

export const getCacheKey = (endpoint, params) => {
  return `${endpoint}:${JSON.stringify(params)}`;
};

export const getCachedData = async (key) => {
  try {
    return await dbCache.get(key);
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
};

export const setCachedData = async (key, data) => {
  try {
    await dbCache.set(key, data);
  } catch (error) {
    console.error('Error setting cached data:', error);
  }
};

export const clearCache = async () => {
  try {
    await dbCache.clear();
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export const clearExpiredCache = async () => {
  try {
    await dbCache.clearExpired();
  } catch (error) {
    console.error('Error clearing expired cache:', error);
  }
};

setInterval(() => {
  clearExpiredCache();
}, 10 * 60 * 1000);

export default dbCache;
