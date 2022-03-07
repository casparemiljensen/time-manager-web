import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeregistrationService {

  httpOptions = {
    headers: new HttpHeaders({})
  }

  constructor(
    private http: HttpClient
  ) { }
}
