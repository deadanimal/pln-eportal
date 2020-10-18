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
    EducationalProgramViewSet,
    EducationalProgramDateViewSet,
    EducationalProgramApplicationViewSet,
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

educational_programs_router = router.register(
    'educational-programs', EducationalProgramViewSet
)

educational_programs_router = router.register(
    'educational-program-dates', EducationalProgramDateViewSet
)

educational_program_applications_router = router.register(
    'educational-program-applications', EducationalProgramApplicationViewSet
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
    PublicationViewSet
)

publications_router = router.register(
    'publications', PublicationViewSet
)

# Virtuallibraries app
from virtuallibraries.views import (
    VirtuallibraryViewSet
)

virtuallibraries_router = router.register(
    'virtual-libraries', VirtuallibraryViewSet
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
    FeedbackViewSet
)

feedbacks_router = router.register(
    'feedbacks', FeedbackViewSet
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
    FacilityViewSet,
    FacilityBookingViewSet
)

venues_router = router.register(
    'venues', VenueViewSet
)

facilities_router = router.register(
    'facilities', FacilityViewSet
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