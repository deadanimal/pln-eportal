import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { DailyOperatingReport } from "./daily-operating-reports.model";

@Injectable({
  providedIn: "root",
})
export class DailyOperatingReportsService {
  // URL
  public url: string = environment.baseUrl + "v1/daily-operating-reports/";

  // Data
  public dailyoperatingreports: DailyOperatingReport[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<DailyOperatingReport> {
    return this.http.post<DailyOperatingReport>(this.url, body).pipe(
      tap((res) => {
        // console.log("DailyOperatingReport: ", res);
      })
    );
  }

  get(): Observable<DailyOperatingReport[]> {
    return this.http.get<DailyOperatingReport[]>(this.url).pipe(
      tap((res) => {
        this.dailyoperatingreports = res;
        // console.log("DailyOperatingReports: ", res);
      })
    );
  }

  update(body, id: string): Observable<DailyOperatingReport> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<DailyOperatingReport>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("DailyOperatingReport: ", res);
      })
    );
  }

  delete(id: string): Observable<DailyOperatingReport> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<DailyOperatingReport>(urlDelete).pipe(
      tap((res) => {
        // console.log("DailyOperatingReport: ", res);
      })
    );
  }

  filter(field: String): Observable<DailyOperatingReport[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<DailyOperatingReport[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("DailyOperatingReports: ", res);
      })
    );
  }

  extended(field): Observable<DailyOperatingReport[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<DailyOperatingReport[]>(urlExtended).pipe(
      tap((res) => {
        // console.log("DailyOperatingReports: ", res);
      })
    );
  }
}
