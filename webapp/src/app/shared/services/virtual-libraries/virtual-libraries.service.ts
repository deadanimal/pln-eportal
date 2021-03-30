import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Virtuallibrary } from "./virtual-libraries.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibrariesService {
  // URL
  public url: string = environment.baseUrl + "v1/virtual-libraries/";

  // Data
  public virtuallibraries: Virtuallibrary[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<Virtuallibrary> {
    return this.http.post<Virtuallibrary>(this.url, body).pipe(
      tap((res) => {
        // console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<Virtuallibrary[]> {
    return this.http.get<Virtuallibrary[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        // console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<Virtuallibrary> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Virtuallibrary>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Virtual library: ", res);
      })
    );
  }

  delete(id: string): Observable<Virtuallibrary> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Virtuallibrary>(urlDelete).pipe(
      tap((res) => {
        // console.log("Virtual library: ", res);
      })
    );
  }
}
