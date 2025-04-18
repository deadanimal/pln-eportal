import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Showbooking } from "./showbookings.model";

@Injectable({
  providedIn: "root",
})
export class ShowbookingsService {
  // URL
  public url: string = environment.baseUrl + "v1/show-booking/";

  // Data
  public showbookings: Showbooking[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Showbooking> {
    return this.http.post<Showbooking>(this.url, body).pipe(
      tap((res) => {
        // console.log("Showbooking: ", res);
      })
    );
  }

  get(): Observable<Showbooking[]> {
    return this.http.get<Showbooking[]>(this.url).pipe(
      tap((res) => {
        this.showbookings = res;
        // console.log("Showbookings: ", res);
      })
    );
  }

  update(body, id: string): Observable<Showbooking> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Showbooking>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Showbooking: ", res);
      })
    );
  }

  delete(id: string): Observable<Showbooking> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Showbooking>(urlDelete).pipe(
      tap((res) => {
        // console.log("Showbooking: ", res);
      })
    );
  }

  filter(field: String): Observable<Showbooking[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Showbooking[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Showbookings", res);
      })
    );
  }

  extended(field: string): Observable<Showbooking[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<Showbooking[]>(urlExtended).pipe(
      tap((res) => {
        // console.log("Showbookings: ", res);
      })
    );
  }

  get_dashboard(): Observable<any> {
    return this.http.get<any>(this.url + "get_dashboard").pipe(
      tap((res) => {
        // console.log('Showbookings: ', res)
      })
    );
  }
}
