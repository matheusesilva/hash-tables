class HashMap {
  constructor() {
    this.buckets = [];
    this.bucketCount = 0;
    this.capacity = 16;
    this.loadFactor = 0.8;
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }
    return hashCode;
  }
  set(key, value) {
    if (this.bucketCount > this.capacity * this.loadFactor) {
      this.capacity *= 2;
      console.log(`Capacity updated to ${this.capacity}`);
    }
    const bucket = this.hash(key);
    if (this.has(key)) {
      let currentNode = this.buckets[bucket];
      while (currentNode.key !== key) {
        currentNode = currentNode.next;
      }
      currentNode.value = value;
      console.log(`Key ${key} had the value updated to ${value}`);
    } else {
      if (this.buckets[bucket] === undefined) {
        this.bucketCount++;
        this.buckets[bucket] = new Node(key, value);
      } else {
        let currentNode = this.buckets[bucket];
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
        }
        currentNode.next = new Node(key, value);
      }
      console.log(`The ${key} had the value ${value} inserted`);
    }
  }
  get(key) {
    const bucket = this.hash(key);
    if (this.buckets[bucket] !== undefined) {
      let currentNode = this.buckets[bucket];
      while (currentNode.key !== key) {
        currentNode = currentNode.next;
      }
      return currentNode.key === key ? currentNode.value : null;
    }
    return null;
  }
  has(key) {
    const bucket = this.hash(key);
    if (this.buckets[bucket] !== undefined) {
      let currentNode = this.buckets[bucket];
      while (currentNode.key !== key && currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      return currentNode.key === key ? true : false;
    }
    return false;
  }
  remove(key) {
    if (!this.has(key)) {
      return false;
    }
    const bucket = this.hash(key);
    let currentNode = this.buckets[bucket];
    if (currentNode.key === key) {
      this.buckets[bucket] =
        currentNode.next === null ? undefined : currentNode.next;
      console.log(`Key ${key} has been removed`);
      return true;
    } else {
      while (currentNode.next.key !== key) {
        currentNode = currentNode.next;
      }
      const nodesAfter = currentNode.next.next;
      currentNode.next = nodesAfter;
      console.log(`Key ${key} has been removed`);
      return true;
    }
  }
  length() {
    let keyCounter = 0;
    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        keyCounter++;
        let currentNode = bucket;
        while (currentNode.next !== null) {
          keyCounter++;
          currentNode = currentNode.next;
        }
      }
    });
    return keyCounter;
  }
  clear() {
    this.buckets = [];
  }
  keys() {
    let keys = this.entries().map((pair) => pair[0]);
    console.log(keys);
    return keys;
  }
  values() {
    let values = this.entries().map((pair) => pair[1]);
    console.log(values);
    return values;
  }
  entries() {
    let array = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        let currentNode = bucket;
        while (currentNode.next !== null) {
          array.push([currentNode.key, currentNode.value]);
          currentNode = currentNode.next;
        }
        array.push([currentNode.key, currentNode.value]);
      }
    });
    return array;
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
