import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibrarySerialpublication } from "./virtual-library-serialpublications.model";

@Injectable({
  providedIn: "root",
})
export class VirtualLibrarySerialpublicationsService {
  // URL
  public url: string =
    environment.baseUrl + "v1/virtual-library-serialpublications/";

  // Data
  public virtuallibraries: VirtualLibrarySerialpublication[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<VirtualLibrarySerialpublication> {
    return this.http.post<VirtualLibrarySerialpublication>(this.url, body).pipe(
      tap((res) => {
        // console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<VirtualLibrarySerialpublication[]> {
    return this.http.get<VirtualLibrarySerialpublication[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        // console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body, id: string): Observable<VirtualLibrarySerialpublication> {
    let urlPatch = this.url + id + "/";
    return this.http
      .patch<VirtualLibrarySerialpublication>(urlPatch, body)
      .pipe(
        tap((res) => {
          // console.log("Virtual library: ", res);
        })
      );
  }

  delete(id: string): Observable<VirtualLibrarySerialpublication> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibrarySerialpublication>(urlDelete).pipe(
      tap((res) => {
        // console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibrarySerialpublication[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibrarySerialpublication[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibrarySerialpublication[]> {
    return this.http
      .get<VirtualLibrarySerialpublication[]>(this.url + "extended")
      .pipe(
        tap((res) => {
          this.virtuallibraries = res;
          // console.log("Virtual libraries: ", res);
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
}
