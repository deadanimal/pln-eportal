import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Publication } from "./publications.model";

@Injectable({
  providedIn: "root",
})
export class PublicationsService {
  // URL
  public url: string = environment.baseUrl + "v1/publications/";

  // Data
  public publications: Publication[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<Publication> {
    return this.http.post<Publication>(this.url, body).pipe(
      tap((res) => {
        // console.log("Publication: ", res);
      })
    );
  }

  get(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.url).pipe(
      tap((res) => {
        this.publications = res;
        // console.log("Publications: ", res);
      })
    );
  }

  update(body, id: string): Observable<Publication> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<Publication>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Publication: ", res);
      })
    );
  }

  delete(id: string): Observable<Publication> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<Publication>(urlDelete).pipe(
      tap((res) => {
        // console.log("Publication: ", res);
      })
    );
  }

  filter(field: String): Observable<Publication[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<Publication[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Publications: ", res);
      })
    );
  }

  extended(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.url + "extended").pipe(
      tap((res) => {
        this.publications = res;
        // console.log("Publications: ", res);
      })
    );
  }

  get_total_download_pdf() {
    let urlGetTotalDownloadPdf = this.url + "get_total_download_pdf";
    return this.http.get(urlGetTotalDownloadPdf).pipe(
      tap((res) => {
        // console.log("Total download PDF", res);
      })
    );
  }

  get_analytic_total_download_pdf(): Observable<any[]> {
    let urlGetAnalyticTotalDownloadPdf =
      this.url + "get_analytic_total_download_pdf";
    return this.http.get<any[]>(urlGetAnalyticTotalDownloadPdf).pipe(
      tap((res) => {
        // console.log("Analytic Total download PDF", res);
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
