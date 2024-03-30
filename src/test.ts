//Import the PusleEmitter Library
import { EventArray, EventDetails, PulseEmitter } from "./index";

//Define the Events
const events: EventArray = [
  {
    eventName: 'Fizz',
    cadence: 3_000,
  } as EventDetails,
  {
    eventName: 'Buzz',
    cadence: 5_000,
  } as EventDetails,
];

//create the PulseEmitter Instance
const pulseEmitter = new PulseEmitter(events);

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