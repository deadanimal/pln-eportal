import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ExhibitDetailImage } from "./exhibit-detail-images.model";

@Injectable({
  providedIn: "root",
})
export class ExhibitDetailImagesService {
  // URL
  public url: string = environment.baseUrl + "v1/exhibit-detail-images/";

  // Data
  public exhibitdetailimages: ExhibitDetailImage[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<ExhibitDetailImage> {
    return this.http.post<ExhibitDetailImage>(this.url, body).pipe(
      tap((res) => {
        // console.log("ExhibitDetailImage: ", res);
      })
    );
  }

  get(): Observable<ExhibitDetailImage[]> {
    return this.http.get<ExhibitDetailImage[]>(this.url).pipe(
      tap((res) => {
        this.exhibitdetailimages = res;
        // console.log("ExhibitDetailImages: ", res);
      })
    );
  }

  update(body, id: string): Observable<ExhibitDetailImage> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<ExhibitDetailImage>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("ExhibitDetailImage: ", res);
      })
    );
  }

  delete(id: string): Observable<ExhibitDetailImage> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<ExhibitDetailImage>(urlDelete).pipe(
      tap((res) => {
        // console.log("ExhibitDetailImage: ", res);
      })
    );
  }

  filter(field: string): Observable<ExhibitDetailImage[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<ExhibitDetailImage[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("ExhibitDetailImages: ", res);
      })
    );
  }

  extended(): Observable<ExhibitDetailImage[]> {
    return this.http.get<ExhibitDetailImage[]>(this.url + "extended").pipe(
      tap((res) => {
        this.exhibitdetailimages = res;
        // console.log("ExhibitDetailImages: ", res);
      })
    );
  }
}
