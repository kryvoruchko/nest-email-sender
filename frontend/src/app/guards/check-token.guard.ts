import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CheckTokenGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): boolean {
    if (this._authService.isAuthenticated()) {
      this._router.navigate([`/${this._authService.role}/dashboard`]);
      return false;
    }
    return true;
  }
}
