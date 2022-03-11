import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Timeregistration } from './timeregistration.model';

@Injectable({
  providedIn: 'root'
})
export class TimeregistrationService {
  private timeregistrationsUrl = 'https://localhost:7118/api/timeregistrations';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({})
  }

  constructor(
    private http: HttpClient
  ) { }

/** GET Timeregistrations from the server */
getTimeregistrations(): Observable<Timeregistration[]> {
  return this.http.get<Timeregistration[]>(this.timeregistrationsUrl)
    .pipe(
      catchError(this.handleError<Timeregistration[]>('getTimeregistrations', []))
    );
}

getTimeregistration(id: number): Observable<Timeregistration> {
  const url = `${this.timeregistrationsUrl}/${id}`;
  return this.http.get<Timeregistration>(url).pipe(
    catchError(this.handleError<Timeregistration>(`getTimeregistration id=${id}`))
  );
}

 /** GET hero by id. Return `undefined` when id not found */
 getTimeregistrationNo404<Data>(id: number): Observable<Timeregistration> {
  const url = `${this.timeregistrationsUrl}/?id=${id}`;
  return this.http.get<Timeregistration[]>(url)
    .pipe(
      map(timeregistrations => timeregistrations[0]), // returns a {0|1} element array
      catchError(this.handleError<Timeregistration>(`getTimeregistration id=${id}`))
    );
}

addTimeregistration(timeregistration: Timeregistration): Observable<Timeregistration> {
  return this.http.post<Timeregistration>(this.timeregistrationsUrl, timeregistration, this.httpOptions).pipe(
    catchError(this.handleError<Timeregistration>('addTimeregistration'))
  );
}

updateTimeregistration(timeregistration: Timeregistration): Observable<any> {
  return this.http.put(this.timeregistrationsUrl + "/" + timeregistration.id, timeregistration).pipe(
    catchError(this.handleError<any>('updateTimeregistration'))
  );
}

/** DELETE: delete the timeregistration from the server */
deleteTimeregistration(id: number): Observable<Timeregistration> {
  const url = `${this.timeregistrationsUrl}/${id}`;

  return this.http.delete<Timeregistration>(url, this.httpOptions).pipe(
    catchError(this.handleError<Timeregistration>('deleteTimeregistration'))
  );
}

/* GET timeregistrations whose name contains search term */
searchTimeregistrations(term: string): Observable<Timeregistration[]> {
  if (!term.trim()) {
    // if not search term, return empty timeregistrations array.
    return of([]);
  }
  return this.http.get<Timeregistration[]>(`${this.timeregistrationsUrl}/?name=${term}`).pipe(
    catchError(this.handleError<Timeregistration[]>('searchTimeregistrations', []))
  );
}

/**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
