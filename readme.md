# 🔥 PulseEmit: A simple way to schedule recurring events in Javascript.
The purpose of this library is to provide a simple way to schedule recurring events in Javascript using the EventEmitter pattern. It is desigend to provdie more information and structure than a simple setInterval, but less than a full blown cron job.

## 🚀 Getting Started
Get started by install the package by using npm with the '''npm i pulse-emit''' command.
The import into your project the PulseEmitter object and any types (if using Typescript).

```typescript
//Import the PusleEmitter Library
import { PulseEmitter, EventArray, EventDetails } from "pulse-emit";
```

## ⏲️ Creating Events
To create an event, create an event object consisting of an _eventName_ and _cadence_. Store many events in an evets array. In the following example, there are two events, Fizz and Buzz. Fizz happens every 3 seconds and Buzz happens every 5 seconds.

```typescript
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
```

## 🎉 Starting the PulseEmitter
To start the PulseEmitter, create a new instance of the _PulseEmitter_ object and pass in the events array. Then listen for events.

```typescript
const pulseEmitter = new PulseEmitter(events);

//Listen for 'Fizz' Events
pulseEmitter.listen.on('Fizz', (data) => {
  // ... Do Something on A Fizz Event
});

//Listen for 'Buzz' Events
pulseEmitter.listen.on('Buzz', (data) => {
  // ... Do Something on A Buzz Event
});
```

## 📝 Event Data
When an event is emitted, the event data is passed to the event listener. The event data is an object with the following properties: 
- _eventName_: The name of the event.
- _time_: The Unix timestamp the event took palce on.
- _event_: An object with the following properties:
    - _status_: The status of the event ("active", "inactive" or "stopped").
    - _firstExecuted_: The Unix Time stamp since the first event of this type was executed.
    - _lastExecuted_: The Unix Time stamp since the last event of this type was executed.
    - _occurrences_: The number of times an event of this type has occurred.

## ✨ Add or Stop Events
You can manually add or stop events by calling the _addEvent_ or _stopEvent_ methods on the PulseEmitter object.

```typescript
//Add a New Event
pulseEmitter.addEvent({
  eventName: 'NewEvent',
  cadence: 10_000,
} as EventDetails);

//Stop an Event
pulseEmitter.stopEvent('NewEvent');
```

## 🛑 Stopping the PulseEmitter
To stop the PulseEmitter, call the _stopAllEvents_ method on the PulseEmitter object.

```typescript
pulseEmitter.stopAllEvents();
```