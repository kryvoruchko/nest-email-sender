import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IProfile } from "src/app/models/profile.interface";

@Component({
  selector: "app-view-user-profile",
  templateUrl: "./view-user-profile.component.html",
  styleUrls: ["./view-user-profile.component.scss"]
})
export class ViewUserProfileComponent implements OnInit {
  private url = environment.url;
  public profile: IProfile;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${this.url}profile`).subscribe((profile: IProfile) => {
      this.profile = profile;
    });
  }
}
