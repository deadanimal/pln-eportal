import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ErrorLog } from "./error-logs.model";

@Injectable({
  providedIn: "root",
})
export class ErrorLogsService {
  // URL
  public url: string = environment.baseUrl + "v1/error-logs/";

  // Data
  public errorlogs: ErrorLog[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<ErrorLog> {
    return this.http.post<ErrorLog>(this.url, body).pipe(
      tap((res) => {
        // console.log("Error Log: ", res);
      })
    );
  }

  get(): Observable<ErrorLog[]> {
    return this.http.get<ErrorLog[]>(this.url).pipe(
      tap((res) => {
        this.errorlogs = res;
        // console.log("Error Logs: ", res);
      })
    );
  }

  update(body, id: string): Observable<ErrorLog> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<ErrorLog>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Error Log: ", res);
      })
    );
  }

  delete(id: string): Observable<ErrorLog> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<ErrorLog>(urlDelete).pipe(
      tap((res) => {
        // console.log("Error Log: ", res);
      })
    );
  }

  filter(field: String): Observable<ErrorLog[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ErrorLog[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Error Logs: ", res);
      })
    );
  }

  extended(): Observable<ErrorLog[]> {
    return this.http.get<ErrorLog[]>(this.url + "extended").pipe(
      tap((res) => {
        this.errorlogs = res;
        // console.log("Error Logs: ", res);
      })
    );
  }
}
