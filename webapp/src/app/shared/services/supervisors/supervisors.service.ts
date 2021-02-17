import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Supervisor } from "./supervisors.model";

@Injectable({
  providedIn: "root",
})
export class SupervisorsService {
  // URL
  public url: string = environment.baseUrl + "v1/supervisors/";

  // Data
  public supervisors: Supervisor[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<Supervisor> {
    return this.http.post<Supervisor>(this.url, body).pipe(
      tap((res) => {
        console.log("Supervisor: ", res);
      })
    );
  }

  get(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(this.url).pipe(
      tap((res) => {
        this.supervisors = res;
        console.log("Supervisors: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<Supervisor> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Supervisor>(urlPatch, body).pipe(
      tap((res) => {
        console.log("Supervisor: ", res);
      })
    );
  }

  delete(id: string): Observable<Supervisor> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Supervisor>(urlDelete).pipe(
      tap((res) => {
        console.log("Supervisor: ", res);
      })
    );
  }

  filter(field: String): Observable<Supervisor[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Supervisor[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Supervisor", res);
      })
    );
  }

  extended(field): Observable<Supervisor[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<Supervisor[]>(urlExtended).pipe(
      tap((res) => {
        console.log("Supervisors: ", res);
      })
    );
  }
}
