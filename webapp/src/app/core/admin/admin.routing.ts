import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExhibitComponent } from './exhibit/exhibit.component';
import { FacilityComponent } from './facility/facility.component'
import { ManagementComponent } from './management/management.component';
import { ReportComponent } from './report/report.component';
import { ShowComponent } from './show/show.component';
import { TicketingComponent } from './ticketing/ticketing.component';
import { VisitComponent } from './visit/visit.component';
import { ProgramComponent } from './program/program.component';
import { ShowingDatabaseComponent } from './showing-database/showing-database.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'analytics',
                component: AnalyticsComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'management',
                children: [
                    {
                        path: 'user',
                        component: ManagementComponent
                    }
                ]
            },
            {
                path: 'educational-program',
                children: [
                    {
                        path: 'database',
                        component: ProgramComponent
                    }
                ]
            },
            {
                path: 'report',
                component: ReportComponent
            },
            {
                path: 'showing',
                children: [
                    {
                        path: 'showtime',
                        component: ShowComponent
                    },
                    {
                        path: 'database',
                        component: ShowingDatabaseComponent
                    }
                ]
            },
            {
                path: 'ticketing',
                component: TicketingComponent
            },
            {
                path: 'visit',
                children: [
                    {
                        path: 'application',
                        component: VisitComponent
                    }
                ]
            }
        ]
    }
]