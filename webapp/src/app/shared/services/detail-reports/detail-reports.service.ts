import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { DetailReport } from "./detail-reports.model";

@Injectable({
  providedIn: "root",
})
export class DetailReportsService {
  // URL
  public url: string = environment.baseUrl + "v1/detail-reports/";

  // Data
  public detailreports: DetailReport[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<DetailReport> {
    return this.http.post<DetailReport>(this.url, body).pipe(
      tap((res) => {
        // console.log("DetailReport: ", res);
      })
    );
  }

  get(): Observable<DetailReport[]> {
    return this.http.get<DetailReport[]>(this.url).pipe(
      tap((res) => {
        this.detailreports = res;
        // console.log("DetailReports: ", res);
      })
    );
  }

  update(body, id: string): Observable<DetailReport> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<DetailReport>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("DetailReport: ", res);
      })
    );
  }

  delete(id: string): Observable<DetailReport> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<DetailReport>(urlDelete).pipe(
      tap((res) => {
        // console.log("DetailReport: ", res);
      })
    );
  }

  filter(field: String): Observable<DetailReport[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<DetailReport[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("DetailReports: ", res);
      })
    );
  }
}
