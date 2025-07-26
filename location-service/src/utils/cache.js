class LocalCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = 60000) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  debug() {
    const entries = [];
    this.cache.forEach((item, key) => {
      entries.push({
        key,
        value: item.value,
        expires: new Date(item.expiry).toISOString()
      });
    });
    return entries;
  }

  initializeTestData() {
    const testLocations = [
      {
        ride_id: "7490423e-8d9b-4fe9-81e4-028037c271a4",
        location: {
          latitude: 24.8949,
          longitude: 91.8687
        }
      }
    ];

    testLocations.forEach(({ride_id, location}) => {
      this.set(`ride:${ride_id}:location`, location);
    });
  }
}

export const localCache = new LocalCache();
// Initialize test data
localCache.initializeTestData();
