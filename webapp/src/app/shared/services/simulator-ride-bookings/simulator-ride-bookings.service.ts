import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { SimulatorRideBooking } from "./simulator-ride-bookings.model";

@Injectable({
  providedIn: "root",
})
export class SimulatorRideBookingsService {
  // URL
  public url: string = environment.baseUrl + "v1/simulator-ride-bookings/";

  // Data
  public simulatorridebookings: SimulatorRideBooking[] = [];

  constructor(private http: HttpClient) {}

  post(body): Observable<SimulatorRideBooking> {
    return this.http.post<SimulatorRideBooking>(this.url, body).pipe(
      tap((res) => {
        // console.log("SimulatorRideBooking: ", res);
      })
    );
  }

  get(): Observable<SimulatorRideBooking[]> {
    return this.http.get<SimulatorRideBooking[]>(this.url).pipe(
      tap((res) => {
        this.simulatorridebookings = res;
        // console.log("SimulatorRideBookings: ", res);
      })
    );
  }

  update(body, id: string): Observable<SimulatorRideBooking> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<SimulatorRideBooking>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("SimulatorRideBooking: ", res);
      })
    );
  }

  delete(id: string): Observable<SimulatorRideBooking> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<SimulatorRideBooking>(urlDelete).pipe(
      tap((res) => {
        // console.log("SimulatorRideBooking: ", res);
      })
    );
  }

  filter(field: string): Observable<SimulatorRideBooking[]> {
    let urlFilter = this.url + "?" + field;
    return this.http.get<SimulatorRideBooking[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("SimulatorRideBookings: ", res);
      })
    );
  }

  extended(field: string): Observable<SimulatorRideBooking[]> {
    let urlExtended = "";
    if (field) urlExtended = this.url + "extended/?" + field;
    else urlExtended = this.url + "extended";
    return this.http.get<SimulatorRideBooking[]>(urlExtended).pipe(
      tap((res) => {
        // console.log("SimulatorRideBookings: ", res);
      })
    );
  }

  get_dashboard(): Observable<any> {
    return this.http.get<any>(this.url + "get_dashboard").pipe(
      tap((res) => {
        // console.log('SimulatorRideBookings: ', res)
      })
    );
  }
}
