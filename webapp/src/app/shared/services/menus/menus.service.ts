import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Menu } from "./menus.model";

@Injectable({
  providedIn: "root",
})
export class MenusService {
  // URL
  public url: string = environment.baseUrl + "v1/menus/";

  // Data
  public menus: Menu[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Menu> {
    return this.http.post<Menu>(this.url, body).pipe(
      tap((res) => {
        // console.log("Menu: ", res);
      })
    );
  }

  get(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.url).pipe(
      tap((res) => {
        this.menus = res;
        // console.log("Menus: ", res);
      })
    );
  }

  update(id: string, body): Observable<Menu> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Menu>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Menu: ", res);
      })
    );
  }

  delete(id: string): Observable<Menu> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Menu>(urlDelete).pipe(
      tap((res) => {
        // console.log("Menu: ", res);
      })
    );
  }

  filter(field: String): Observable<Menu[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Menu[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Menus: ", res);
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
