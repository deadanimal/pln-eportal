import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Showtime } from './showtimes.model';

@Injectable({
  providedIn: 'root'
})
export class ShowtimesService {

  // URL
  public url: string = environment.baseUrl + 'v1/show-times/'

  // Data
  public showtimes: Showtime[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body: Form): Observable<Showtime> {
    return this.http.post<Showtime>(this.url, body).pipe(
      tap((res) => {
        // console.log('Showtime: ', res)
      })
    )
  }

  get(): Observable<Showtime[]> {
    return this.http.get<Showtime[]>(this.url).pipe(
      tap((res) => {
        this.showtimes = res
        // console.log('Showtimes: ', res)
      })
    )
  }

  update(body: Form, id: string): Observable<Showtime>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<Showtime>(urlPatch, body).pipe(
      tap((res) => {
        // console.log('Showtime: ', res)
      })
    )
  }

  delete(id: string): Observable<Showtime> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<Showtime>(urlDelete).pipe(
      tap((res) => {
        // console.log('Showtime: ', res)
      })
    )
  }

  extended(): Observable<Showtime[]> {
    return this.http.get<Showtime[]>(this.url + 'extended').pipe(
      tap((res) => {
        this.showtimes = res
        // console.log('Showtimes: ', res)
      })
    )
  }

}
