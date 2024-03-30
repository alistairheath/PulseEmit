"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import the PusleEmitter Library
const index_1 = require("./index");
//Define the Events
const events = [
    {
        eventName: 'Fizz',
        cadence: 3000,
    },
    {
        eventName: 'Buzz',
        cadence: 5000,
    },
];
//create the PulseEmitter Instance
const pulseEmitter = new index_1.PulseEmitter(events);
//Listen for 'Fizz' Events
pulseEmitter.listen.on('Fizz', (data) => {
    console.log(data);
    if (data.event.occurrences > 5) {
        pulseEmitter.stopEvent('Fizz');
    }
});
//Listen for 'Buzz' Events
pulseEmitter.listen.on('Buzz', (data) => {
    console.log(data);
    if (data.event.occurrences > 2) {
        pulseEmitter.stopEvent('Buzz');
    }
});
