import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

export const GlobalRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "notifications",
        component: NotificationsComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
    ],
  },
];
