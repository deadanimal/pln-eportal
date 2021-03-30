import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ResponseCode } from "./response-codes.model";

@Injectable({
  providedIn: "root",
})
export class ResponseCodesService {
  // URL
  public url: string = environment.baseUrl + "v1/response-codes/";

  // Data
  public responsecodes: ResponseCode[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<ResponseCode> {
    return this.http.post<ResponseCode>(this.url, body).pipe(
      tap((res) => {
        // console.log("ResponseCode: ", res);
      })
    );
  }

  get(): Observable<ResponseCode[]> {
    return this.http.get<ResponseCode[]>(this.url).pipe(
      tap((res) => {
        this.responsecodes = res;
        // console.log("ResponseCodes: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<ResponseCode> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<ResponseCode>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("ResponseCode: ", res);
      })
    );
  }

  delete(id: string): Observable<ResponseCode> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<ResponseCode>(urlDelete).pipe(
      tap((res) => {
        // console.log("ResponseCode: ", res);
      })
    );
  }
}
