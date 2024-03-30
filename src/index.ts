import { EventEmitter } from 'events';

export type EventStatus = 'active' | 'inactive' | 'stopped';

export type EventDetails = {
  id?: number; // The id of the event.
  eventName: string; // The name of the event.
  cadence: number; // The Regularity of the event in milliseconds.
};

type EventConfig = {
  interval: NodeJS.Timeout | number; // The interval of the event.
  firstExecuted: number; // The first time the event was executed.
  lastExecuted: number; // The last time the event was executed.
  occurrences: number; // The number of times the event has occurred.
  status: EventStatus; // The status of the event.
};

interface EventFullDetails extends EventDetails {
  config: EventConfig; // The configuration of the event.
};

export type EventArray = Array<EventDetails>;
type EventKernel = Array<EventFullDetails>;

export class PulseEmitter {
  public listen: EventEmitter;
  public events: EventKernel;

  constructor(events: EventArray) {
    this.listen = new EventEmitter();
    this.events = [];
    events.forEach((event) => {
      this.addEvent(event);
    });
  }

  public addEvent(ev: EventDetails) {
    const event: EventFullDetails = {
      ...ev,
      config: {
        status: 'active',
        interval: 0,
        firstExecuted: 0,
        lastExecuted: 0,
        occurrences: 0,
      }
    };
    
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

  public stopEvent(eventName: string) {
    this.events.forEach((event) => {
      if (event.eventName === eventName) {
        clearInterval(event.config.interval);
        event.config.status = 'stopped';
      }
    });
  }
};