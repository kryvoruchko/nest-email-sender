import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { DeveloperComponent } from "./developer.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { ViewUserProfileComponent } from "../../components/view-user-profile/view-user-profile.component";

const routes: Routes = [
  {
    path: "developer",
    component: DeveloperComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "profile",
        component: ViewUserProfileComponent
      },
      {
        path: "profile/edit",
        component: ViewUserProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule {}
