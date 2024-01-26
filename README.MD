# Practical task 3

## Task 1

Write your own `EventEmitter` class. It must contain `on / addEventListener` method, `off / removeEventListener` method, 
`once` method, `emit` method, `rawListeners` method, `listenerCount` method. This basic features are sufficient to implement a full system using the eventing model.


```
class EventEmitter {
listeners = {};  // key-value pair

addListener(eventName, fn) {}

on(eventName, fn) {}

removeListener(eventName, fn) {}

off(eventName, fn) {}

once(eventName, fn) {}

emit(eventName, ...args) {}

listenerCount(eventName) {}

rawListeners(eventName) {}
}
```

Test your own `EventEmitter` class with this example of code:

```
const myEmitter = new EventEmitter();

function c1() {
console.log('an event occurred!');
}

function c2() {
console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));
```

The program can be started via npm script using nodemon(i.e. npm run task1).

## Task 2

Write a class WithTime which should extend your own class EventEmitter. WithTime must execute some Async function, 
arguments, and compute the time taken by this function. You must emit event start and end of execute with some console.log. 
And emit event with console.log of data. This data you will get from Async function which must fetch transform the data into 
json from url - **https://jsonplaceholder.typicode.com/posts/1** .

```
class WithTime extends EventEmitter {
execute(asyncFunc, ...args) {}
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));
```

## Task 3

Write a program which should do the following: Read the content of csvfile from./csvdirectory. **Example** . 
Use the **csvtojson package** to convert csvfile to json object. Write the csvfile content to a new txtfile. 
Use the following **format**. Do not load all the content of the csvfile into RAM via stream (read/write file content 
line by line). In case of read/write errors, log them in the console. The program should be started via npm script 
using nodemon(i.e. npm run task2).

## Evaluation criteria

### 5-point scoring system

- `3` - Acceptance criteria 1-2 are implemented.
- `4` - Acceptance criteria 1-3 are implemented.
- `5` - Acceptance criteria 1-4 are implemented.

### 100-point scoring system

- `60 - 69` - Acceptance criteria 1-2 are partially implemented.
- `70 - 79` - Acceptance criteria 1-2 are implemented.
- `80 - 89` - Acceptance criteria 1-3 are implemented.
- `90 - 100` - Acceptance criteria 1-4 are implemented.