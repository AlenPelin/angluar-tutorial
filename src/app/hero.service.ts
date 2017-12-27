import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from '../lib/rxjs/Observable/ArrayObservable';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(
    private messageService: MessageService
  ) { }

  get Heroes(): Observable<Hero[]>{
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return new ArrayObservable([ HEROES ]); 
  }
}
