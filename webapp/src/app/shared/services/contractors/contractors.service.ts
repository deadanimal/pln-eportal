import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Contractor } from "./contractors.model";

@Injectable({
  providedIn: "root",
})
export class ContractorsService {
  // URL
  public url: string = environment.baseUrl + "v1/contractors/";

  // Data
  public contractors: Contractor[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Contractor> {
    return this.http.post<Contractor>(this.url, body).pipe(
      tap((res) => {
        // console.log("Contractor: ", res);
      })
    );
  }

  get(): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(this.url).pipe(
      tap((res) => {
        this.contractors = res;
        // console.log("Contractors: ", res);
      })
    );
  }

  update(body, id: string): Observable<Contractor> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Contractor>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Contractor: ", res);
      })
    );
  }

  delete(id: string): Observable<Contractor> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Contractor>(urlDelete).pipe(
      tap((res) => {
        // console.log("Contractor: ", res);
      })
    );
  }

  filter(field: String): Observable<Contractor[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Contractor[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Contractors: ", res);
      })
    );
  }
}
