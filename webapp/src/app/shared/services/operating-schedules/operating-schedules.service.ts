import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { OperatingSchedule } from "./operating-schedules.model";

@Injectable({
  providedIn: "root",
})
export class OperatingSchedulesService {
  // URL
  public url: string = environment.baseUrl + "v1/operating-schedules/";

  // Data
  public operatingschedules: OperatingSchedule[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<OperatingSchedule> {
    return this.http.post<OperatingSchedule>(this.url, body).pipe(
      tap((res) => {
        // console.log("OperatingSchedule: ", res);
      })
    );
  }

  get(): Observable<OperatingSchedule[]> {
    return this.http.get<OperatingSchedule[]>(this.url).pipe(
      tap((res) => {
        this.operatingschedules = res;
        // console.log("OperatingSchedules: ", res);
      })
    );
  }

  update(body, id: string): Observable<OperatingSchedule> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<OperatingSchedule>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("OperatingSchedule: ", res);
      })
    );
  }

  delete(id: string): Observable<OperatingSchedule> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<OperatingSchedule>(urlDelete).pipe(
      tap((res) => {
        // console.log("OperatingSchedule: ", res);
      })
    );
  }

  filter(field: String): Observable<OperatingSchedule[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<OperatingSchedule[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("OperatingSchedules: ", res);
      })
    );
  }
}
