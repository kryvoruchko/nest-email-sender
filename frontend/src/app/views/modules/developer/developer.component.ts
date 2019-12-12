import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-developer",
  templateUrl: "./developer.component.html"
})
export class DeveloperComponent implements OnInit {
  public preloader = true;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.preloader = false;
    }, 1000);
  }
}
