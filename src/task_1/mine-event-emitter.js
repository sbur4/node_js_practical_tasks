class EventEmitter {
    constructor() {
        this.listeners = {}; // key-value pair
    }

    addListener(eventName, func) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(func);
    }

    on(eventName, func) {
        this.addListener(eventName, func);
    }

    removeListener(eventName, func) {
        const eventListeners = this.listeners[eventName];
        if (eventListeners) {
            this.listeners[eventName] = eventListeners.filter(listener => listener !== func);
        }
    }

    off(eventName, func) {
        this.removeListener(eventName, func);
    }

    once(eventName, func) {
        const onceWrapper = (...args) => {
            func(...args);
            this.off(eventName, onceWrapper);
        };
        this.on(eventName, onceWrapper);
    }

    emit(eventName, ...args) {
        const eventListeners = this.listeners[eventName];
        if (eventListeners) {
            eventListeners.forEach(listener => listener(...args));
        }
    }

    listenerCount(eventName) {
        const eventListeners = this.listeners[eventName];
        return eventListeners ? eventListeners.length : 0;
    }

    rawListeners(eventName) {
        return this.listeners[eventName] || [];
    }
}

module.exports = EventEmitter;