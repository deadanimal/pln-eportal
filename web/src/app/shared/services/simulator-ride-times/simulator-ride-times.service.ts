import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { SimulatorRideTime } from "./simulator-ride-times.model";

@Injectable({
  providedIn: "root",
})
export class SimulatorRideTimesService {
  // URL
  public url: string = environment.baseUrl + "v1/simulator-ride-times/";

  // Data
  public simulatorridetimes: SimulatorRideTime[] = [];

  constructor(private http: HttpClient) {}

  post(body: Form): Observable<SimulatorRideTime> {
    return this.http.post<SimulatorRideTime>(this.url, body).pipe(
      tap((res) => {
        // console.log("SimulatorRideTime: ", res);
      })
    );
  }

  get(): Observable<SimulatorRideTime[]> {
    return this.http.get<SimulatorRideTime[]>(this.url).pipe(
      tap((res) => {
        this.simulatorridetimes = res;
        // console.log("SimulatorRideTimes: ", res);
      })
    );
  }

  update(body: Form, id: string): Observable<SimulatorRideTime> {
    let urlPatch = this.url + id + "/";
    return this.http.patch<SimulatorRideTime>(urlPatch, body).pipe(
      tap((res) => {
        // console.log("SimulatorRideTime: ", res);
      })
    );
  }

  delete(id: string): Observable<SimulatorRideTime> {
    let urlDelete = this.url + id + "/";
    return this.http.delete<SimulatorRideTime>(urlDelete).pipe(
      tap((res) => {
        // console.log("SimulatorRideTime: ", res);
      })
    );
  }

  filter(field: String): Observable<SimulatorRideTime[]> {
    let urlFilter = this.url + '?' + field;
    return this.http.get<SimulatorRideTime[]>(urlFilter).pipe(
      tap((res) => {
        // console.log("SimulatorRideTimes: ", res);
      })
    );
  }
}

