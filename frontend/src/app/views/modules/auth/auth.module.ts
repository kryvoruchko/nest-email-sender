import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../../../shared/shared.module";

import { AuthGuard } from "../../../guards/auth.guard";

import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { CheckTokenGuard } from "src/app/guards/check-token.guard";

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  providers: [CheckTokenGuard]
})
export class AuthModule {}
