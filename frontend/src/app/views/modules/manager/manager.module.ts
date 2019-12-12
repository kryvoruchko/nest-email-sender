import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManagerRoutingModule } from "./manager-routing.module";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ManagerComponent } from './manager.component';

@NgModule({
  declarations: [ManagerComponent],
  imports: [CommonModule, ManagerRoutingModule],
  providers: [AuthGuard]
})
export class ManagerModule {}
