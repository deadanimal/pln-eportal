import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { url } from "inspector";
import { AuthService } from "../services/auth/auth.service";
import { UserAccessesService } from "../services/user-accesses/user-accesses.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private useraccessService: UserAccessesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("ro", route);
    const expectedRole = route.data.role;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["/auth/login"]);
      return false;
    }
    // to find if menu can accessible using role
    let urls = [
      "/dashboard",
      "/shows/applications/",
      "/simulator-ride/bookings",
      "/simulator-ride/applications",
      "/managements/user-accesses",
    ];
    if (!~urls.indexOf(state.url)) {
      let result = this.useraccessService.menuroles.find((obj) => {
        return state.url.includes(obj.menu.path);
      });
      console.log('re', result);
      if (!result) {
        this.router.navigate(["**"]);
        return false;
      }
    }
    return true;
  }
}
