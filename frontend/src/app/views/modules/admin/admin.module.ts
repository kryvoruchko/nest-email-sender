import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AuthGuard } from "src/app/guards/auth.guard";
import { AdminComponent } from "./admin.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  providers: [AuthGuard]
})
export class AdminModule {}
