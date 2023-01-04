/*Typically we don't check token validity on the client side but catch the 401 response in the Interceptor.
We will handle JWT token expiration using the HTTP_INTERCEPTOR provider. With the Interceptor, we can add the bearer
token to HTTP requests or handle errors.

We will dispatch 'logout' event to 'App' component when response status tells us the access token is expired.

First we need to set up a global event-driven system, or PubSub (publish-subscribe) system, which allows us to listen and dispatch (emit)
events from independent components so that they don't have directh dependencies between each other.

We create this EventBusService with two methods: 'on' and 'emit'.
*/

//import EventBusService in App component and liste to 'logout' event
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventData } from './event.class';


@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject<EventData>()

  constructor() { }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}

/* Now we can emit 'event' to the bus and if any listener was registered with
the 'eventName', it will execute the callback function 'action'.
*/
