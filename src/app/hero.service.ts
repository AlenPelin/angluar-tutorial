import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from './hero';

@Injectable()
export class HeroService {

  constructor() { }

  get Heroes(): Hero[]{
    return HEROES;
  }
}
