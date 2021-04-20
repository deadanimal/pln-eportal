import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IntegrationsService {
  // URL
  public url: string = environment.baseUrl + "v1/integrations/";

  constructor(private http: HttpClient) {}

  verify_recaptcha(body): Observable<any> {
    let urlRecaptcha = this.url + "verify_recaptcha/";
    return this.http.post(urlRecaptcha, body).pipe(
      tap((res) => {
        // console.log("Verify recaptcha: ", res);
      })
    );
  }

  get_summary_stats_daily(): Observable<any> {
    var s = "summary";
    var g = "daily";
    var today = new Date();
    var sd = today.getDate();
    var sm = today.getMonth() + 1;
    var sy = today.getFullYear();
    var ed = today.getDate();
    var em = today.getMonth() + 1;
    var ey = today.getFullYear();
    var fullurl =
      "s=" +
      s +
      "&g=" +
      g +
      "&sd=" +
      sd +
      "&sm=" +
      sm +
      "&sy=" +
      sy +
      "&ed=" +
      ed +
      "&em=" +
      em +
      "&ey=" +
      ey;
    let urlGetStatCounter = this.url + "get_statcounter/?" + fullurl;
    return this.http.get(urlGetStatCounter).pipe(
      tap((res) => {
        // console.log("Statcounters: ", res);
      })
    );
  }

  get_summary_stats_yearly(): Observable<any> {
    var s = "summary";
    var g = "yearly";
    var today = new Date();
    var sy = today.getFullYear();
    var ey = 2050;
    var fullurl = "s=" + s + "&g=" + g + "&sy=" + sy + "&ey=" + ey;
    let urlGetStatCounter = this.url + "get_statcounter/?" + fullurl;
    return this.http.get(urlGetStatCounter).pipe(
      tap((res) => {
        // console.log("Statcounters: ", res);
      })
    );
  }

  get_head_counter_value(): Observable<any> {
    var urlGetHeadCounter = this.url + "get_head_counter_value/";
    return this.http.get(urlGetHeadCounter).pipe(
      tap((res) => {
        // console.log("GetHeadCounter: ", res);
      })
    );
  }
}
