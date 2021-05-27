import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { HeadCounter } from "./head-counters.model";

@Injectable({
  providedIn: "root",
})
export class HeadCountersService {
  // URL
  public url: string = environment.baseUrl + "v1/head-counters/";

  // Data
  public headcounters: HeadCounter[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<HeadCounter> {
    return this.http.post<HeadCounter>(this.url, body).pipe(
      tap((res) => {
        // console.log("HeadCounter: ", res);
      })
    );
  }

  get(): Observable<HeadCounter[]> {
    return this.http.get<HeadCounter[]>(this.url).pipe(
      tap((res) => {
        this.headcounters = res;
        // console.log("HeadCounters: ", res);
      })
    );
  }

  update(body, id: string): Observable<HeadCounter> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<HeadCounter>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("HeadCounter: ", res);
      })
    );
  }

  delete(id: string): Observable<HeadCounter> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<HeadCounter>(urlDelete).pipe(
      tap((res) => {
        // console.log("HeadCounter: ", res);
      })
    );
  }

  get_analytic_total_head_counter(body): Observable<any[]> {
    let urlGetAnalyticTotalHeadCounter =
      this.url + "get_analytic_total_head_counter/";
    return this.http.post<any[]>(urlGetAnalyticTotalHeadCounter, body).pipe(
      tap((res) => {
        // console.log("HeadCounter: ", res);
      })
    );
  }
}
