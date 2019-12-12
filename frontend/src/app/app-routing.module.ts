import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./views/modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "",
    loadChildren: () =>
      import("./views/modules/developer/developer.module").then(
        m => m.DeveloperModule
      )
  },
  {
    path: "",
    loadChildren: () =>
      import("./views/modules/manager/manager.module").then(
        m => m.ManagerModule
      )
  },
  {
    path: "",
    loadChildren: () =>
      import("./views/modules/admin/admin.module").then(m => m.AdminModule)
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
