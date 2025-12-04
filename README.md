# HashMap — Project Overview

This repository contains a full implementation of a hash map data structure in JavaScript, including collision handling, dynamic resizing based on load factor, and a complete suite of map-like operations. The implementation follows the assignment specification, enforcing bucket boundaries and handling only string keys.

## Limitation Handling
JavaScript arrays allow arbitrary index access, so we enforce bounds checking whenever accessing a bucket:

```js
if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}
```

This ensures that storage remains properly constrained to the hash map’s capacity.

## Features

### Hashing Logic
The `hash(key)` function:

- Accepts only string keys.
- Iteratively builds a hash code using a prime multiplier.
- Applies modulo during each loop iteration to avoid integer overflow on long keys.
- Returns a hash code that is always within bucket range.

### HashMap Structure
The class maintains the following internal properties:

- **capacity** — initial value `16`, doubled when load factor is exceeded.
- **loadFactor** — `0.75`.
- **buckets** — an array of arrays (each bucket stores key–value pairs).
- **size counter** — tracks the number of stored keys.

### Core Methods

- `set(key, value)`  
  Stores or updates a key–value pair.  
  Handles collisions by chaining within buckets.  
  Triggers automatic resizing when the load factor is exceeded.

- `get(key)`  
  Returns the stored value or `null` if not found.

- `has(key)`  
  Returns `true` if the key exists.

- `remove(key)`  
  Removes the key–value pair and returns `true`; returns `false` if missing.

- `length()`  
  Returns the total number of keys stored.

- `clear()`  
  Empties all buckets.

- `keys()`  
  Returns an array of all keys.

- `values()`  
  Returns an array of all values.

- `entries()`  
  Returns an array of `[key, value]` pairs.

Resizing preserves all keys and rehashes them into the expanded bucket array.

### Extra Credit
The repository includes an optional `HashSet` implementation that stores only unique string keys using the same hashing and collision-handling logic as the `HashMap`.

## Testing the Hash Map

Example usage:

```js
import HashMap from "./HashMap.js";

const test = new HashMap(); // load factor defaults to 0.75

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// At this point, load factor is 0.75

// Overwrite existing values
test.set('banana', 'bright yellow');
test.set('lion', 'dark golden');

// Trigger capacity expansion
test.set('moon', 'silver');

// Validate functionality
console.log(test.get('moon'));
console.log(test.has('apple'));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
```

## Notes
- Uses plain JavaScript with ES6 modules.
- Collision handling uses bucket chaining.
- All resizing logic rehashes existing entries for even distribution.

## License
MIT License.
