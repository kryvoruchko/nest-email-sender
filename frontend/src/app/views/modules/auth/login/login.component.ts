import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { catchError } from "rxjs/internal/operators";
import { throwError } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public submitProcess = false;
  public loginForm: FormGroup;
  public submitted = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Login process
   */
  public signIn() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitProcess = true;
      this._authService.login(this.loginForm.value).subscribe(
        (data: any) => {
          localStorage.setItem("tokenApp", data.access_token);
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("email", this.loginForm.controls["email"].value);
          this._router.navigate(["developer/dashboard"]);
          this.submitProcess = false;
        },
        (err: any) => {
          this.submitProcess = false;
          this._toastrService.error(err.error.message);
        }
      );
    }
  }
}
