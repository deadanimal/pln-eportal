import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { VirtualLibraryPanduanPengguna } from "./virtual-library-panduan-pengguna.model";

@Injectable({
  providedIn: 'root'
})
export class VirtualLibraryPanduanPenggunaService {

  // URL
  public url: string =
    environment.baseUrl + "v1/virtual-library-panduan-pengguna/";

  // Data
  public virtuallibraries: VirtualLibraryPanduanPengguna[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<VirtualLibraryPanduanPengguna> {
    return this.http.post<VirtualLibraryPanduanPengguna>(this.url, body).pipe(
      tap((res) => {
        // console.log("Virtual library: ", res);
      })
    );
  }

  get(): Observable<VirtualLibraryPanduanPengguna[]> {
    return this.http.get<VirtualLibraryPanduanPengguna[]>(this.url).pipe(
      tap((res) => {
        this.virtuallibraries = res;
        // console.log("Virtual libraries: ", res);
      })
    );
  }

  update(body, id: string): Observable<VirtualLibraryPanduanPengguna> {
    let urlPatch = this.url + id + "/";
    return this.http
      .patch<VirtualLibraryPanduanPengguna>(urlPatch, body)
      .pipe(
        tap((res) => {
          // console.log("Virtual library: ", res);
        })
      );
  }

  delete(id: string): Observable<VirtualLibraryPanduanPengguna> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<VirtualLibraryPanduanPengguna>(urlDelete).pipe(
      tap((res) => {
        // console.log("Virtual library: ", res);
      })
    );
  }

  filter(field: string): Observable<VirtualLibraryPanduanPengguna[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<VirtualLibraryPanduanPengguna[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Virtual libraries: ", res);
      })
    );
  }

  extended(): Observable<VirtualLibraryPanduanPengguna[]> {
    return this.http
      .get<VirtualLibraryPanduanPengguna[]>(this.url + "extended")
      .pipe(
        tap((res) => {
          this.virtuallibraries = res;
          // console.log("Virtual libraries: ", res);
        })
      );
  }
}
