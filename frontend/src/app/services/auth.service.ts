import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { environment } from "../../environments/environment";
import { UserInterface } from "../models/user";
import * as jwt_decode from "jwt-decode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = environment.url;
  private email: string;
  public role: string = "admin";

  constructor(private _http: HttpClient, private _router: Router) {}

  /**
   * Sign up
   * @param {UserInterface} registerUser
   * @returns {Observable<any>}
   */
  public signUp(registerUser: UserInterface): Observable<any> {
    return this._http.post(this.url + "auth/registration", registerUser);
  }

  /**
   * Login
   * @param {UserInterface} loginUser
   * @returns {Observable<any>}
   */
  public login(loginUser: UserInterface): Observable<any> {
    return this._http.post(this.url + "auth/login", loginUser);
  }

  /**
   * Log out
   */
  public logOut(): void {
    localStorage.removeItem("tokenApp");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    this._router.navigate(["/login"]);
  }

  public getToken(): string {
    this.email = localStorage.getItem("email");
    return localStorage.getItem("tokenApp");
  }

  /**
   * Check token
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    const token = this.getToken();
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
