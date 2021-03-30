import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Rating } from "./ratings.model";

@Injectable({
  providedIn: "root",
})
export class RatingsService {
  // URL
  public url: string = environment.baseUrl + "v1/ratings/";

  // Data
  public ratings: Rating[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<Rating> {
    return this.http.post<Rating>(this.url, body).pipe(
      tap((res) => {
        // console.log("Rating: ", res);
      })
    );
  }

  get(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.url).pipe(
      tap((res) => {
        this.ratings = res;
        // console.log("Ratings: ", res);
      })
    );
  }

  update(body, id: string): Observable<Rating> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Rating>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Rating: ", res);
      })
    );
  }

  delete(id: string): Observable<Rating> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Rating>(urlDelete).pipe(
      tap((res) => {
        // console.log("Rating: ", res);
      })
    );
  }

  filter(field: String): Observable<Rating[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Rating[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Ratings: ", res);
      })
    );
  }

  extended(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.url + "extended").pipe(
      tap((res) => {
        this.ratings = res;
        // console.log("Ratings: ", res);
      })
    );
  }
}
