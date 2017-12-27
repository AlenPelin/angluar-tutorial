import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Subscriber } from "rxjs/Subscriber";

export class ArrayObservable<T> extends Observable<T> {
  constructor(public array: T[]) {
    super();
    
    this.value = array[0];    
  }

  value: any;

  
  protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void {
    let index = 0;
    const array = this.array;
    const count = array.length;
 {
      for (let i = 0; i < count; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    }
  }
}
