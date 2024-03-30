"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulseEmitter = void 0;
const events_1 = require("events");
;
class PulseEmitter {
    constructor(events) {
        this.listen = new events_1.EventEmitter();
        this.events = [];
        events.forEach((event) => {
            this.addEvent(event);
        });
    }
    addEvent(ev) {
        const event = Object.assign(Object.assign({}, ev), { config: {
                status: 'active',
                interval: 0,
                firstExecuted: 0,
                lastExecuted: 0,
                occurrences: 0,
            } });
        event.id = Math.max(...this.events.map((e) => e.id || 0), -1) + 1;
        this.events.push(event);
        this.events[event.id].config.interval = setInterval(() => {
            const timestamp = Date.now();
            if (typeof event.id === 'number') {
                if (!this.events[event.id].config.firstExecuted) {
                    this.events[event.id].config.firstExecuted = timestamp;
                }
                this.events[event.id].config.lastExecuted = timestamp;
                this.events[event.id].config.occurrences += 1;
            }
            this.listen.emit(event.eventName, {
                eventName: event.eventName,
                time: timestamp,
                event: typeof event.id === 'number' ? {
                    status: this.events[event.id].config.status,
                    firstExecuted: this.events[event.id].config.firstExecuted,
                    lastExecuted: this.events[event.id].config.lastExecuted,
                    occurrences: this.events[event.id].config.occurrences,
                } : null,
            });
        }, event.cadence);
    }
    stopEvent(eventName) {
        this.events.forEach((event) => {
            if (event.eventName === eventName) {
                clearInterval(event.config.interval);
                event.config.status = 'stopped';
            }
        });
    }
}
exports.PulseEmitter = PulseEmitter;
;
