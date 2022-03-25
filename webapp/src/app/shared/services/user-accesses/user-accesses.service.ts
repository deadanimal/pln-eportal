import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { MenuRole } from './user-accesses.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccessesService {

  // URL
  public url: string = environment.baseUrl + 'v1/menu-roles/'

  // Data
  public menuroles: MenuRole[] = []

  constructor(
    private http: HttpClient
  ) { }

  post(body): Observable<MenuRole> {
    return this.http.post<MenuRole>(this.url, body).pipe(
      tap((res) => {
        // console.log('MenuRole: ', res)
      })
    )
  }

  get(): Observable<MenuRole[]> {
    return this.http.get<MenuRole[]>(this.url).pipe(
      tap((res) => {
        this.menuroles = res
        // console.log('MenuRoles: ', res)
      })
    )
  }

  update(id: string, body: Form): Observable<MenuRole>  {
    let urlPatch = this.url + id + '/'
    return this.http.patch<MenuRole>(urlPatch, body).pipe(
      tap((res) => {
        // console.log('MenuRole: ', res)
      })
    )
  }

  delete(id: string): Observable<MenuRole> {
    let urlDelete = this.url + id + '/'
    return this.http.delete<MenuRole>(urlDelete).pipe(
      tap((res) => {
        // console.log('MenuRole: ', res)
      })
    )
  }

  filter(field: String): Observable<MenuRole[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<MenuRole[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("MenuRole", res);
      })
    );
  }

  extended(field): Observable<MenuRole[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<MenuRole[]>(urlExtended).pipe(
      tap((res) => {
        this.menuroles = res;
        // console.log("MenuRoles: ", res);
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
