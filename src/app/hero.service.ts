import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,map,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'
  constructor(private messageService: MessageService, private http: HttpClient) { }
  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    this.log('fetched heroes');
    // return heroes;
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_=>this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
      )
  }
  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id === id)!;
    // this.log(`fetched hero id=${id}`);
    // return of(hero);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`));
    )
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T>=>{
      console.error(error)
      this.log(`${operation} failed: ${error.message}` );
      return of(result as T);
    }
  }
}
