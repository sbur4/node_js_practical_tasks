const EventEmitter = require("../task_1/mine-event-emitter");

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        if (typeof asyncFunc !== 'function') {
            throw new Error('asyncFunc must be a function');
        }

        this.emit('begin');
        console.time('execute');

        try {
            const data = await asyncFunc(...args);
            console.timeEnd('execute');
            this.emit('end');
            // this.emit('data', data);
            this.emit("data", JSON.stringify(data));
        } catch (error) {
            this.emit('error', error);
        }
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data) => console.log(`Data received: ${data}`));
withTime.on('error', (error) => console.error(`Error: ${error.message}`));

console.log(withTime.rawListeners('end'));

const fetchData = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
};

withTime.execute(fetchData);