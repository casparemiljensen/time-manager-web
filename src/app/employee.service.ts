import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'https://localhost:7135/api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET employees from the server */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

   /** GET hero by id. Return `undefined` when id not found */
   getEmployeeNo404<Data>(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/?id=${id}`;
    return this.http.get<Employee[]>(url)
      .pipe(
        map(employees => employees[0]), // returns a {0|1} element array
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  /** DELETE: delete the employee from the server */
  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  /* GET employees whose name contains search term */
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty employeef array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Employee[]>('searchEmployees', []))
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
