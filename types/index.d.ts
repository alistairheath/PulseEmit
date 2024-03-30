import EventEmitter from "events";

export type EventStatus = 'active' | 'inactive' | 'stopped';

export type EventDetails = {
  id?: number; // The id of the event.
  eventName: string; // The name of the event.
  cadence: number; // The Regularity of the event in milliseconds.
};

export type EventConfig = {
  interval: NodeJS.Timeout | number; // The interval of the event.
  firstExecuted: number; // The first time the event was executed.
  lastExecuted: number; // The last time the event was executed.
  occurrences: number; // The number of times the event has occurred.
  status: EventStatus; // The status of the event.
};

export interface EventFullDetails extends EventDetails {
  config: EventConfig; // The configuration of the event.
}

export type EventArray = Array<EventDetails>;
type EventKernel = Array<EventFullDetails>;

export declare class PulseEmitter {
  listen: EventEmitter;
  events: EventKernel;

  constructor(events: EventArray);

  addEvent(ev: EventDetails) : void;
  stopEvent(eventName: string) : void;
  stopAllEvents() : void;
}