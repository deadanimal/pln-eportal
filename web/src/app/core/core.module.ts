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
import { RatingModule } from "ngx-bootstrap/rating";
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
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin

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
import { ProgramFilterPipe } from "../shared/pipes/program/program-filter.pipe";
import { ProgramImageFilterPipe } from "../shared/pipes/program/program-image-filter.pipe";
import { ProgramFormsComponent } from "./program-forms/program-forms.component";
import { FacilityImageFilterPipe } from "../shared/pipes/facility/facility-image-filter.pipe";
import { FacilityDetailZonesComponent } from "./facility-detail-zones/facility-detail-zones.component";
import { SurveyQuestionFilterPipe } from "../shared/pipes/survey/survey-question-filter.pipe";
import { NocComponent } from "./noc/noc.component";
import { CharterComponent } from "./charter/charter.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { CopyrightNoticeComponent } from "./copyright-notice/copyright-notice.component";
import { DisclaimerComponent } from "./disclaimer/disclaimer.component";
import { CioComponent } from "./cio/cio.component";
import { FacilityPriceFilterPipe } from "../shared/pipes/facility/facility-price-filter.pipe";
import { ProfileComponent } from "./profile/profile.component";
import { PublicationListsComponent } from "./publication-lists/publication-lists.component";
import { VirtualLibraryTentangKamiComponent } from "./virtual-library-tentang-kami/virtual-library-tentang-kami.component";
import { VirtualLibraryArtikelTerkiniComponent } from "./virtual-library-artikel-terkini/virtual-library-artikel-terkini.component";
import { VirtualLibraryKoleksiComponent } from "./virtual-library-koleksi/virtual-library-koleksi.component";
import { VirtualLibraryPerkhidmatanComponent } from "./virtual-library-perkhidmatan/virtual-library-perkhidmatan.component";
import { VirtualLibraryArkibKutubkhanahComponent } from "./virtual-library-arkib-kutubkhanah/virtual-library-arkib-kutubkhanah.component";
import { VirtualLibraryEsumberComponent } from "./virtual-library-esumber/virtual-library-esumber.component";
import { ArkibKutubkhanahFilterPipe } from "../shared/pipes/virtual-library/arkib-kutubkhanah/arkib-kutubkhanah-filter.pipe";
import { EsumberFilterPipe } from "../shared/pipes/virtual-library/esumber/esumber-filter.pipe";
import { VirtualLibraryBukuComponent } from './virtual-library-buku/virtual-library-buku.component';
import { VirtualLibraryTerbitanBersiriComponent } from './virtual-library-terbitan-bersiri/virtual-library-terbitan-bersiri.component';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { QuickLinkComponent } from './quick-link/quick-link.component';
import { SafePipe } from '../shared/pipes/safe/safe.pipe';
import { SignupComponent } from './signup/signup.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin
]);

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
    ProgramFilterPipe,
    ProgramImageFilterPipe,
    ProgramFormsComponent,
    FacilityImageFilterPipe,
    FacilityDetailZonesComponent,
    SurveyQuestionFilterPipe,
    NocComponent,
    CharterComponent,
    PasswordResetComponent,
    PrivacyPolicyComponent,
    CopyrightNoticeComponent,
    DisclaimerComponent,
    CioComponent,
    FacilityPriceFilterPipe,
    ProfileComponent,
    PublicationListsComponent,
    VirtualLibraryTentangKamiComponent,
    VirtualLibraryArtikelTerkiniComponent,
    VirtualLibraryKoleksiComponent,
    VirtualLibraryPerkhidmatanComponent,
    VirtualLibraryArkibKutubkhanahComponent,
    VirtualLibraryEsumberComponent,
    ArkibKutubkhanahFilterPipe,
    EsumberFilterPipe,
    VirtualLibraryBukuComponent,
    VirtualLibraryTerbitanBersiriComponent,
    EmployeeDirectoryComponent,
    QuickLinkComponent,
    SafePipe,
    SignupComponent,
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
    RatingModule.forRoot(),
    LeafletModule.forRoot(),
    GalleryModule,
    LightboxModule,
    FullCalendarModule,
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
