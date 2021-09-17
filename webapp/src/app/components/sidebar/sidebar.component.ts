import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ROUTES } from "../../shared/menu/menu-items";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { JwtService } from "src/app/shared/handler/jwt/jwt.service";
import { MenusService } from "src/app/shared/services/menus/menus.service";
import { UserAccessesService } from "src/app/shared/services/user-accesses/user-accesses.service";

var misc: any = {
  sidebar_mini_active: true,
};

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  // Image
  imgLogo: string = "assets/img/logo/planetarium-logo.png";

  public menuItems: any[];
  public isCollapsed = true;
  public menu;
  public menus = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private menuService: MenusService,
    private useraccessService: UserAccessesService
  ) {}

  getChildrenMenu(item) {
    return {
      path: item.path,
      title: item.title,
      type: "link",
    };
  }

  ngOnInit() {
    if (this.jwtService.getToken("accessToken")) {
      if (this.authService.decodedToken().user_id) {
        this.useraccessService
          .extended("role=" + this.authService.decodedToken().role)
          .subscribe(
            (res) => {
              // console.log("res", res);
              this.menuRoles(res);
            },
            (err) => {
              console.error("err", err);
            }
          );

        this.menuItems = ROUTES.filter((menuItem) => {
          if (menuItem.role.length > 0) {
            // to push the object into menuItems array based on roles
            for (let i = 0; i < menuItem.role.length; i++) {
              if (menuItem.role[i] == this.authService.decodedToken().role) {
                return menuItem;
              }
            }
          }
        });
      }
    }

    // this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  menuRoles(menuroles) {
    this.menuService.filter("active=true").subscribe(
      (res) => {
        // console.log("res", res);

        var mainmenus = [];
        var submenus = [];

        res.forEach((obj) => {
          if ((obj.type == "link" && obj.mainmenu == "") || obj.type == "sub") {
            let result = menuroles.find((menurole) => {
              return menurole.menu.id == obj.id;
            });
            if (result) mainmenus.push(obj);
          } else {
            submenus.push(obj);
          }
        });

        mainmenus.forEach((obj) => {
          if (obj.type == "link") {
            obj = {
              id: obj.id,
              path: "/" + obj.path,
              title: obj.title,
              type: "link",
              icontype: obj.icontype,
              ordering: obj.ordering,
              role: this.authService.decodedToken().role,
            };
          } else if (obj.type == "sub") {
            let result = submenus.filter((a) => {
              let objOrderingLength = obj.ordering.toString().length;
              let astrOrderingSubstr = a.ordering
                .toString()
                .substr(0, objOrderingLength);
              let objstrOrderingSubstr = obj.ordering
                .toString()
                .substr(0, objOrderingLength);
              if (
                objstrOrderingSubstr === astrOrderingSubstr &&
                a.type === "link"
              ) {
                return true;
              }
            });

            obj = {
              id: obj.id,
              path: "/" + obj.path,
              title: obj.title,
              type: "sub",
              icontype: obj.icontype,
              collapse: obj.path,
              isCollapsed: true,
              children: result.map(this.getChildrenMenu),
              ordering: obj.ordering,
              role: this.authService.decodedToken().role,
            };
          }

          this.menus.push(obj);
        }, Object.create(null));
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }

  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }

  minimizeSidebar() {
    const sidenavToggler =
      document.getElementsByClassName("sidenav-toggler")[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}
