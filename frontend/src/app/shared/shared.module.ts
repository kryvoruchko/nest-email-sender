import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { HeaderComponent } from "./components/header/header.component";
import { PreloaderComponent } from "./components/preloader/preloader.component";
import { HeaderService } from "./components/header/header.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { DashboardComponent } from "../views/components/dashboard/dashboard.component";
import { UsersComponent } from "../views/components/users/users.component";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    PreloaderComponent,
    SidebarComponent,
    DashboardComponent,
    UsersComponent
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgbModule],
  providers: [HeaderService],
  exports: [
    PageNotFoundComponent,
    NgbModule,
    RouterModule,
    HeaderComponent,
    ReactiveFormsModule,
    PreloaderComponent,
    SidebarComponent,
    DashboardComponent,
    UsersComponent
  ]
})
export class SharedModule {}
