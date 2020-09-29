import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TagInputModule } from "ngx-chips";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxNumberSpinnerModule } from "ngx-number-spinner";
import { NguCarouselModule } from "@ngu/carousel";
import { NgxGalleryModule } from "ngx-gallery";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { BarRatingModule } from "ngx-bar-rating";
import { TmNgOdometerModule } from "tm-ng-odometer";
import { NgMarqueeModule } from "ng-marquee";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";

import { RouterModule } from "@angular/router";
import { CoreRoutes } from "./core.routing";
import { HomeComponent } from "./home/home.component";
import { ShowsComponent } from "./shows/shows.component";
import { TicketingComponent } from "./ticketing/ticketing.component";
import { FacilityComponent } from "./facility/facility.component";
import { SurveyComponent } from "./survey/survey.component";
import { ProgramComponent } from "./program/program.component";
import { VisitComponent } from "./visit/visit.component";
import { ExhibitComponent } from "./exhibit/exhibit.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { PublicationComponent } from "./publication/publication.component";
import { PaymentComponent } from "./payment/payment.component";
import { FacilityDetailsComponent } from "./facility-details/facility-details.component";
import { PaymentFacilityComponent } from "./payment-facility/payment-facility.component";
import { ShowDetailsComponent } from "./show-details/show-details.component";
import { ExhibitDetailsComponent } from "./exhibit-details/exhibit-details.component";
import { SimulatorRideComponent } from "./simulator-ride/simulator-ride.component";
import { VirtualLibraryComponent } from "./virtual-library/virtual-library.component";
import { LandingComponent } from "./landing/landing.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { OrganizationChartComponent } from "./organization-chart/organization-chart.component";
import { MissionVisionComponent } from "./mission-vision/mission-vision.component";
import { PdpaComponent } from "./pdpa/pdpa.component";
import { FaqComponent } from "./faq/faq.component";
import { SimulatorRideBookComponent } from "./simulator-ride-book/simulator-ride-book.component";
import { ShowsBookComponent } from "./shows-book/shows-book.component";
import { ExhibitListsComponent } from "./exhibit-lists/exhibit-lists.component";
import { DirectoryComponent } from "./directory/directory.component";
import { OperatingHourComponent } from "./operating-hour/operating-hour.component";

@NgModule({
  declarations: [
    HomeComponent,
    ShowsComponent,
    TicketingComponent,
    FacilityComponent,
    SurveyComponent,
    ProgramComponent,
    VisitComponent,
    ExhibitComponent,
    ContactUsComponent,
    PublicationComponent,
    PaymentComponent,
    FacilityDetailsComponent,
    PaymentFacilityComponent,
    ShowDetailsComponent,
    ExhibitDetailsComponent,
    SimulatorRideComponent,
    VirtualLibraryComponent,
    LandingComponent,
    AboutUsComponent,
    OrganizationChartComponent,
    MissionVisionComponent,
    PdpaComponent,
    FaqComponent,
    SimulatorRideBookComponent,
    ShowsBookComponent,
    ExhibitListsComponent,
    DirectoryComponent,
    OperatingHourComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    JwBootstrapSwitchNg2Module,
    AngularMultiSelectModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    LeafletModule.forRoot(),
    NgxNumberSpinnerModule,
    NguCarouselModule,
    NgxGalleryModule,
    RouterModule.forChild(CoreRoutes),
    YouTubePlayerModule,
    BarRatingModule,
    TmNgOdometerModule,
    NgMarqueeModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    TranslateModule,
    AccordionModule.forRoot(),
  ],
})
export class CoreModule {}
