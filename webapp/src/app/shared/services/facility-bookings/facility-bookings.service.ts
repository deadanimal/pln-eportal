import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { FacilityBooking } from "./facility-bookings.model";

@Injectable({
  providedIn: "root",
})
export class FacilityBookingsService {
  // URL
  public url: string = environment.baseUrl + "v1/facility-bookings/";

  // Data
  public facilityBookings: FacilityBooking[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<FacilityBooking> {
    return this.http.post<FacilityBooking>(this.url, body).pipe(
      tap((res) => {
        // console.log("Facility booking: ", res);
      })
    );
  }

  get(): Observable<FacilityBooking[]> {
    return this.http.get<FacilityBooking[]>(this.url).pipe(
      tap((res) => {
        this.facilityBookings = res;
        // console.log("Facility bookings: ", res);
      })
    );
  }

  update(body, id: string): Observable<FacilityBooking> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<FacilityBooking>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("Facility booking: ", res);
      })
    );
  }

  delete(id: string): Observable<FacilityBooking> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<FacilityBooking>(urlDelete).pipe(
      tap((res) => {
        // console.log("Facility booking: ", res);
      })
    );
  }

  filter(field: string): Observable<FacilityBooking[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<FacilityBooking[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("Facility bookings: ", res);
      })
    );
  }

  extended(): Observable<FacilityBooking[]> {
    return this.http.get<FacilityBooking[]>(this.url + "extended").pipe(
      tap((res) => {
        // console.log("Facility bookings: ", res);
      })
    );
  }

  get_dashboard(): Observable<any> {
    return this.http.get<any>(this.url + 'get_dashboard').pipe(
      tap((res) => {
        // console.log('Educational program applications: ', res)
      })
    )
  }

  number_of_facility_bookings(body: Form): Observable<any[]> {
    let url = this.url + "number_of_facility_bookings/";
    return this.http.post<any[]>(url, body).pipe(
      tap((res) => {
        // console.log("Facility bookings: ", res);
      })
    );
  }

  number_of_facility_bookings_frequency(body: Form): Observable<any[]> {
    let url = this.url + "number_of_facility_bookings_frequency/";
    return this.http.post<any[]>(url, body).pipe(
      tap((res) => {
        // console.log("Facility bookings: ", res);
      })
    );
  }

  number_of_facility_bookings_statistic(body: Form): Observable<any[]> {
    let url = this.url + "number_of_facility_bookings_statistic/";
    return this.http.post<any[]>(url, body).pipe(
      tap((res) => {
        // console.log("Facility bookings: ", res);
      })
    );
  }
}
