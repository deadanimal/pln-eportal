import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VisitorSummary } from "./visitor-summaries.model";

@Injectable({
  providedIn: "root",
})
export class VisitorSummariesService {
  // URL
  public url: string = environment.baseUrl + "v1/visitor-summaries/";

  // Data
  public visitorsummaries: VisitorSummary[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<VisitorSummary> {
    return this.http.post<VisitorSummary>(this.url, body).pipe(
      tap((res) => {
        // console.log("VisitorSummary: ", res);
      })
    );
  }

  get(): Observable<VisitorSummary[]> {
    return this.http.get<VisitorSummary[]>(this.url).pipe(
      tap((res) => {
        this.visitorsummaries = res;
        // console.log("VisitorSummarys: ", res);
      })
    );
  }

  update(body, id: string): Observable<VisitorSummary> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<VisitorSummary>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("VisitorSummary: ", res);
      })
    );
  }

  delete(id: string): Observable<VisitorSummary> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VisitorSummary>(urlDelete).pipe(
      tap((res) => {
        // console.log("VisitorSummary: ", res);
      })
    );
  }

  filter(field: String): Observable<VisitorSummary[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VisitorSummary[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("VisitorSummarys: ", res);
      })
    );
  }
}
