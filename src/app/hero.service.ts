import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from '../lib/rxjs/Observable/ArrayObservable';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  private heroesUrl = 'api/heroes';  // URL to web api

  get Heroes(): Observable<Hero[]>{
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)      
      .pipe(
        tap(heroes => this.log('fetched heroes from restful server')),
        catchError(this.handleError('getHeroes', [])));
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log('fetched heroes from restful server')),
        catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const realHero = hero as Hero;
    const id = realHero != null ? realHero.id : hero as number;

    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`deleted heroe id=${id}`)),
        catchError(this.handleError<Hero>(`deleteHero id=${id}`)));
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return new ArrayObservable([ result as T ]);
    };
  }
}
