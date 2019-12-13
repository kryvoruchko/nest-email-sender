import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { HeaderService } from "./header.service";
import { UserInterface } from "src/app/models/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public profile: UserInterface;
  public role = "admin";

  constructor(
    public authService: AuthService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService
      .getUserByEmail(localStorage.getItem("email"))
      .subscribe(user => {
        this.profile = user;
      });
  }
}
