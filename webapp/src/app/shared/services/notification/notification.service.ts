import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http"; import { Form } from "@angular/forms"; import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Notification } from "./notfication.model";



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // URL
  public url: string = environment.baseUrl + "v1/notification/";

  // Data
  public notification: Notification[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Notification> {
    return this.http.post<Notification>(this.url, body).pipe(
      tap((res) => {
        // console.log("Notification: ", res);
      })
    );
  }

  get(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.url).pipe(
      tap((res) => {
        this.notification = res;
        // console.log("Notification: ", res);
      })
    );
  }

  update(id: string, body): Observable<Notification> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Notification>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Notification: ", res);
      })
    );
  }

  delete(id: string): Observable<Notification> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Notification>(urlDelete).pipe(
      tap((res) => {
        // console.log("Notification: ", res);
      })
    );
  }

  filter(field: String): Observable<Notification[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Notification[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Notification: ", res);
      })
    );
  }

}
