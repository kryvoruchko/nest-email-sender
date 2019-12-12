import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInterface } from "src/app/models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  private url = environment.url;

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.url}users/${email}`);
  }
}
