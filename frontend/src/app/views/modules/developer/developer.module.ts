import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// modules
import { DeveloperRoutingModule } from "./developer-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

// guards
import { AuthGuard } from "src/app/guards/auth.guard";

//components
import { DeveloperComponent } from "./developer.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { ViewUserProfileComponent } from "../../components/view-user-profile/view-user-profile.component";

@NgModule({
  declarations: [
    DeveloperComponent,
    DashboardComponent,
    ViewUserProfileComponent
  ],
  imports: [CommonModule, SharedModule, DeveloperRoutingModule],
  providers: [AuthGuard]
})
export class DeveloperModule {}
