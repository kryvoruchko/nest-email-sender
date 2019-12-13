import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInterface } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private url = environment.url;

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.url}users`);
  }
}
