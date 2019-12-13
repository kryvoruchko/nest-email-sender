import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { UserInterface } from "src/app/models/user";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public users: UserInterface[];

  constructor(private readonly usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
