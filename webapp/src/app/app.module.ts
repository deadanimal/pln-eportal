import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpTokenInterceptor } from "./shared/interceptor/http.token.interceptor";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { CollapseModule } from "ngx-bootstrap/collapse";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { TagInputModule } from "ngx-chips";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PagenotfoundComponent } from "./core/global/pagenotfound/pagenotfound.component";

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      progressBar: true,
      positionClass: "toast-top-right",
    }),
    LeafletModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PagenotfoundComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
