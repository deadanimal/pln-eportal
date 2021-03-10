import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { JwtService } from "../jwt/jwt.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    let data = {};
    data = {
      reason: error && error.error.reason ? error.error.reason : "",
      status: error.status,
    };
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        // Handle Http Error (error.status === 403, 404...)
        if (error.error.code == "token_not_valid") {
          // let title = "Ralat";
          // let message =
          //   "Sesi anda telah tamat. Anda diminta untuk log masuk sekali lagi";
          // this.router.navigate(["/landing"]);
        }
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
    }
    // console.error("It happens: ", error);
    // console.log("Error: ", error);
    return throwError(error);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      Accept: "*/*",
    };
    // "Content-Type": "application/json",

    if (req.url.includes("auth/obtain")) {
      // console.log("Is obtain? ", req.url.includes("auth/obtain"));
      this.jwtService.destroyToken();
    }

    let apiUrl = [
      "carts",
      "facility-bookings",
      "fpx-transactions",
      "invoice-receipts",
      "users",
      "visit-applications",
      "show-times",
      "show-booking",
      "supervisors",
      "facility-bookings",
      "simulator-ride-times",
      "simulator-ride-bookings",
      "bank-lists",
      "vouchers",
    ];

    let result = apiUrl.find((value) => {
      return req.url.includes(value);
    });
    if (result) {
      const token = this.jwtService.getToken("accessToken");
      headersConfig["Authorization"] = `Bearer ${token}`;
      // console.log(headersConfig);
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log("Event: ", event);
        }
        return event;
      }),
      catchError(this.handleError.bind(this))
    );
  }
}
