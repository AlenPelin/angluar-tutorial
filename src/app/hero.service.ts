import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from '../lib/rxjs/Observable/ArrayObservable';

@Injectable()
export class HeroService {

  constructor() { }

  get Heroes(): Observable<Hero[]>{
    return new ArrayObservable([ HEROES ]); 
  }
}
