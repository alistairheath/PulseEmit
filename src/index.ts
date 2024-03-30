import { EventEmitter } from 'events';
import { EventArray, EventDetails, EventFullDetails, EventKernel } from '../types';

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

  public stopAllEvents() {
    this.events.forEach((event) => {
      clearInterval(event.config.interval);
      event.config.status = 'stopped';
    });
  }
};