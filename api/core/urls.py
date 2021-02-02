from datetime import datetime, timedelta

from django.conf import settings
from django.conf.urls import include, url
from django.contrib.gis import admin
from django.views.generic import TemplateView, RedirectView

from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from users.views import (
    MyTokenObtainPairView
)

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass

router = NestedDefaultRouter()

# Assets app
from assets.views import (
    AssetViewSet
)

assets_router = router.register(
    'assets', AssetViewSet
)

# Events app
from events.views import (
    ExhibitViewSet,
    ExhibitListViewSet,
    ExhibitDetailViewSet,
    ExhibitDetailImageViewSet,
    EducationalProgramViewSet,
    EducationalProgramDateViewSet,
    EducationalProgramImageViewSet,
    EducationalProgramActivityViewSet,
    EducationalProgramApplicationViewSet,
    EducationalProgramFormViewSet,
    VisitViewSet,
    VisitApplicationViewSet
)

exhibits_router = router.register(
    'exhibits', ExhibitViewSet
)

exhibit_lists_router = router.register(
    'exhibit-lists', ExhibitListViewSet
)

exhibit_details_router = router.register(
    'exhibit-details', ExhibitDetailViewSet
)

exhibit_detail_images_router = router.register(
    'exhibit-detail-images', ExhibitDetailImageViewSet
)

educational_programs_router = router.register(
    'educational-programs', EducationalProgramViewSet
)

educational_program_dates_router = router.register(
    'educational-program-dates', EducationalProgramDateViewSet
)

educational_program_images_router = router.register(
    'educational-program-images', EducationalProgramImageViewSet
)

educational_program_activities_router = router.register(
    'educational-program-activities', EducationalProgramActivityViewSet
)

educational_program_applications_router = router.register(
    'educational-program-applications', EducationalProgramApplicationViewSet
)

educational_program_forms_router = router.register(
    'educational-program-forms', EducationalProgramFormViewSet
)

visits_router = router.register(
    'visits', VisitViewSet
)

visit_applications_router = router.register(
    'visit-applications', VisitApplicationViewSet
)

# Organisations app
from organisations.views import (
    OrganisationViewSet
)

organisations_router = router.register(
    'organisations', OrganisationViewSet
)

# Payments app
from payments.views import (
    PaymentTicketViewSet
)

payment_tickets_router = router.register(
    'payment-tickets', PaymentTicketViewSet
)

# Publications app
from publications.views import (
    PublicationViewSet,
    PublicationCategoryViewSet
)

publications_router = router.register(
    'publications', PublicationViewSet
)

publication_categories_router = router.register(
    'publication-categories', PublicationCategoryViewSet
)

# Virtuallibraries app
from virtuallibraries.views import (
    VirtualLibraryCategoryViewSet,
    VirtualLibraryArticleViewSet,
    VirtualLibraryCollectionViewSet,
    VirtualLibraryBookViewSet,
    VirtualLibrarySerialPublicationViewSet,
    VirtualLibraryESourceCategoryViewSet,
    VirtualLibraryESourceViewSet,
    VirtualLibraryArchiveKutubkhanahCategoryViewSet,
    VirtualLibraryArchiveKutubkhanahViewSet
)

virtuallibrary_categories_router = router.register(
    'virtual-library-categories', VirtualLibraryCategoryViewSet
)

virtuallibrary_articles_router = router.register(
    'virtual-library-articles', VirtualLibraryArticleViewSet
)

virtuallibrary_collections_router = router.register(
    'virtual-library-collections', VirtualLibraryCollectionViewSet
)

virtuallibrary_books_router = router.register(
    'virtual-library-books', VirtualLibraryBookViewSet
)

virtuallibrary_serialpublications_router = router.register(
    'virtual-library-serialpublications', VirtualLibrarySerialPublicationViewSet
)

virtuallibrary_esource_categories_router = router.register(
    'virtual-library-esource-categories', VirtualLibraryESourceCategoryViewSet
)

virtuallibrary_esources_router = router.register(
    'virtual-library-esources', VirtualLibraryESourceViewSet
)

virtuallibrary_archivekutubkhanah_categories_router = router.register(
    'virtual-library-archivekutubkhanah-categories', VirtualLibraryArchiveKutubkhanahCategoryViewSet
)

virtuallibrary_archivekutubkhanahs_router = router.register(
    'virtual-library-archivekutubkhanahs', VirtualLibraryArchiveKutubkhanahViewSet
)

# Showings app
from showings.views import (
    ShowingViewSet,
    ShowtimeViewSet,
    ShowTicketViewSet,
    ShowBookingViewSet,
)

showings_router = router.register(
    'showings', ShowingViewSet
)

showtimes_router = router.register(
    'show-times', ShowtimeViewSet
)

showt_tickets_router = router.register(
    'show-ticket', ShowTicketViewSet
)

show_booking_router = router.register(
    'show-booking', ShowBookingViewSet
)

# Surveys app
from surveys.views import (
    SurveyAnswerViewSet,
    SurveyQuestionViewSet
)

survey_answers_router = router.register(
    'survey-answers', SurveyAnswerViewSet
)

survey_questions_router = router.register(
    'survey-questions', SurveyQuestionViewSet
)

# Feedbacks app
from feedbacks.views import (
    FeedbackViewSet,
    RatingViewSet
)

feedbacks_router = router.register(
    'feedbacks', FeedbackViewSet
)

ratings_router = router.register(
    'ratings', RatingViewSet
)

# Users app
from users.views import (
    CustomUserViewSet
)

users_router = router.register(
    'users', CustomUserViewSet
)

# Venues app
from venues.views import (
    VenueViewSet,
    FacilitySubcategoryViewSet,
    FacilityViewSet,
    FacilityPriceViewSet,
    FacilityImageViewSet,
    FacilityBookingViewSet
)

venues_router = router.register(
    'venues', VenueViewSet
)

facility_subcategories_router = router.register(
    'facility-subcategories', FacilitySubcategoryViewSet
)

facilities_router = router.register(
    'facilities', FacilityViewSet
)

facility_prices_router = router.register(
    'facility-prices', FacilityPriceViewSet
)

facility_images_router = router.register(
    'facility-images', FacilityImageViewSet
)

facility_bookings_router = router.register(
    'facility-bookings', FacilityBookingViewSet
)

# Simulator rides app
from simulatorrides.views import (
    SimulatorRideViewSet,
    SimulatorRideTimeViewSet,
    SimulatorRideBookingViewSet
)

simulator_rides_router = router.register(
    'simulator-rides', SimulatorRideViewSet
)

simulator_ride_times_router = router.register(
    'simulator-ride-times', SimulatorRideTimeViewSet
)

simulator_ride_bookings_router = router.register(
    'simulator-ride-bookings', SimulatorRideBookingViewSet
)

# Employee Directory app
from employeedirectories.views import (
    EmployeeDirectoryViewSet
)

employee_directories_router = router.register(
    'employee-directories', EmployeeDirectoryViewSet
)

# Partner app
from partners.views import (
    PartnerViewSet
)

partners_router = router.register(
    'partners', PartnerViewSet
)

# Quick Link app
from quicklinks.views import (
    QuickLinkCategoryViewSet,
    QuickLinkViewSet
)

quick_link_categories_router = router.register(
    'quick-link-categories', QuickLinkCategoryViewSet
)

quick_links_router = router.register(
    'quick-links', QuickLinkViewSet
)

# Announcement app
from announcements.views import (
    AnnouncementViewSet
)

announcements_router = router.register(
    'announcements', AnnouncementViewSet
)

# Banner app
from banners.views import (
    BannerViewSet
)

banners_router = router.register(
    'banners', BannerViewSet
)

# FAQ app
from faqs.views import (
    FaqViewSet
)

faqs_router = router.register(
    'faqs', FaqViewSet
)

# Email Template app
from emailtemplates.views import (
    EmailTemplateViewSet
)

email_templates_router = router.register(
    'email-templates', EmailTemplateViewSet
)

# Module app
from modules.views import (
    ModuleViewSet
)

modules_router = router.register(
    'modules', ModuleViewSet
)

# WhatIsInteresting app
from whatisinterestings.views import (
    WhatIsInterestingViewSet
)

whatisinterestings_router = router.register(
    'whatisinterestings', WhatIsInterestingViewSet
)

# Dynamic Content app
from dynamiccontents.views import (
    DynamicContentViewSet
)

dynamiccontents_router = router.register(
    'dynamic-contents', DynamicContentViewSet
)

# Calendar app
from calendars.views import (
    CalendarViewSet
)

calendars_router = router.register(
    'calendars', CalendarViewSet
)

# FPX Transaction app
from fpxtransactions.views import (
    FpxTransactionViewSet,
    BankListViewSet,
    ResponseCodeViewSet
)

fpxtransactions_router = router.register(
    'fpx-transactions', FpxTransactionViewSet
)

banklists_router = router.register(
    'bank-lists', BankListViewSet
)

responsecodes_router = router.register(
    'response-codes', ResponseCodeViewSet
)

# Cart app
from carts.views import (
    CartViewSet
)

carts_router = router.register(
    'carts', CartViewSet
)

# Invoice Receipt app
from invoicereceipts.views import (
    InvoiceReceiptViewSet
)

invoice_receipts_router = router.register(
    'invoice-receipts', InvoiceReceiptViewSet
)

# Voucher app
from vouchers.views import (
    VoucherViewSet
)

vouchers_router = router.register(
    'vouchers', VoucherViewSet
)

urlpatterns = [
    url(r'v1/', include(router.urls)),
    url(r'auth/', include('rest_auth.urls')),
    url(r'auth/registration/', include('rest_auth.registration.urls')),

    # url(r'^$', TemplateView.as_view(template_name="home.html"), name='home'),
    url(r'^signup/$', TemplateView.as_view(template_name="signup.html"),
        name='signup'),
    url(r'^email-verification/$',
        TemplateView.as_view(template_name="email_verification.html"),
        name='email-verification'),
    url(r'^login/$', TemplateView.as_view(template_name="login.html"),
        name='login'),
    url(r'^logout/$', TemplateView.as_view(template_name="logout.html"),
        name='logout'),
    url(r'^password-reset/$',
        TemplateView.as_view(template_name="password_reset.html"),
        name='password-reset'),
    url(r'^password-reset/confirm/$',
        TemplateView.as_view(template_name="password_reset_confirm.html"),
        name='password-reset-confirm'),

    url(r'^user-details/$',
        TemplateView.as_view(template_name="user_details.html"),
        name='user-details'),
    url(r'^password-change/$',
        TemplateView.as_view(template_name="password_change.html"),
        name='password-change'),

    # this url is used to generate email content
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(template_name="password_reset_confirm.html"),
        name='password_reset_confirm'),

    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', TokenVerifyView.as_view(), name='token_verify')
]