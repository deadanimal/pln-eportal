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
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth/auth.service";
import { ErrorLogsService } from "../services/error-logs/error-logs.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private errorlogService: ErrorLogsService,
    private jwtService: JwtService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        // Handle Http Error (error.status === 403, 404...)
        let obj = {
          error: JSON.stringify(error.error),
          message: error.message,
          name: error.name,
          status: error.status,
          statustext: error.statusText,
          url: error.url,
          user: this.jwtService.getToken("accessToken")
            ? this.authService.decodedToken().user_id
            : null,
        };
        this.errorlogService.post(obj).subscribe(
          (res) => {
            // console.log("res", res);
          },
          (err) => {
            // console.error("err", err);
          }
        );
        if (error.error.code == "token_not_valid") {
          let title = "Ralat";
          let message =
            "Sesi anda telah tamat. Anda diminta untuk log masuk sekali lagi";
          this.toastr.error(message, title);
          this.authService.clickLogout();
        }
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      console.log("Client side error", error);
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

    // "users",
    let apiUrl = [
      "carts",
      "facility-bookings",
      "fpx-transactions",
      "invoice-receipts",
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
