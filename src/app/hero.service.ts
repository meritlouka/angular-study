import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private http: HttpClient,private messageService: MessageService) { }
  
  private heroesUrl = 'api/heroes';  // URL to web api
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
  
  // getHeroes(): Hero[] {
  //    return HEROES;
  // }

  // getHeroes(): Observable<Hero[]> {
  // 	  this.messageService.add('HeroService: fetched heroes');
  //     return of(HEROES);
  // }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(this.handleError('getHeroes', []))
    );

  }
  // getHero(id: number): Observable<Hero> {
  //     // Todo: send the message _after_ fetching the hero
  //     this.messageService.add(`HeroService: fetched hero id=${id}`);
  //     return of(HEROES.find(hero => hero.id === id));
  // }
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
}
