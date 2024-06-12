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
  set(key) {
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
      console.log(`Key ${key} was updated`);
    } else {
      if (this.buckets[bucket] === undefined) {
        this.bucketCount++;
        this.buckets[bucket] = new Node(key);
      } else {
        let currentNode = this.buckets[bucket];
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
        }
        currentNode.next = new Node(key);
      }
      console.log(`The ${key} was added`);
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
  entries() {
    let array = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        let currentNode = bucket;
        while (currentNode.next !== null) {
          array.push(currentNode.key);
          currentNode = currentNode.next;
        }
        array.push(currentNode.key);
      }
    });
    return array;
  }
}

class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}
