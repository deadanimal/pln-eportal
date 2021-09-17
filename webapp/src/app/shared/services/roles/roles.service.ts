import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Role } from "./roles.model";

@Injectable({
  providedIn: "root",
})
export class RolesService {
  // URL
  public url: string = environment.baseUrl + "v1/roles/";

  // Data
  public roles: Role[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Role> {
    return this.http.post<Role>(this.url, body).pipe(
      tap((res) => {
        // console.log("Role: ", res);
      })
    );
  }

  get(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url).pipe(
      tap((res) => {
        this.roles = res;
        // console.log("Roles: ", res);
      })
    );
  }

  update(id: string, body): Observable<Role> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Role>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Role: ", res);
      })
    );
  }

  delete(id: string): Observable<Role> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Role>(urlDelete).pipe(
      tap((res) => {
        // console.log("Role: ", res);
      })
    );
  }

  filter(field: String): Observable<Role[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Role[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Roles: ", res);
      })
    );
  }

  getAuditLog(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "get_audit_log/").pipe(
      tap((res) => {
        // console.log("Audit Logs: ", res);
      })
    );
  }
}
