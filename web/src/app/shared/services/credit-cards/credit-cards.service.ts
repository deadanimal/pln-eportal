import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { CreditCard } from "./credit-cards.model";

@Injectable({
  providedIn: "root",
})
export class CreditCardsService {
  // URL
  public url: string = environment.baseUrl + "v1/credit-cards/";

  // Data
  public creditcards: CreditCard[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.url, body).pipe(
      tap((res) => {
        // console.log("CreditCard: ", res);
      })
    );
  }

  get(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.url).pipe(
      tap((res) => {
        this.creditcards = res;
        // console.log("CreditCards: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<CreditCard> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<CreditCard>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("CreditCard: ", res);
      })
    );
  }

  delete(id: string): Observable<CreditCard> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<CreditCard>(urlDelete).pipe(
      tap((res) => {
        // console.log("CreditCard: ", res);
      })
    );
  }
}
