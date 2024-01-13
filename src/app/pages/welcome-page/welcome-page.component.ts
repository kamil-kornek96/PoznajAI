import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  rightClasses: string = "right";
  loaderClasses: string = "loader-container"
  isLogin: boolean = false;


  async ngOnInit() {

  }
  
  loaderOn() {
    this.rightClasses = "right right-full";
    this.loaderClasses = "loader-container loader-center"
  }

  loaderOff() {
    this.rightClasses = "right";
    this.loaderClasses = "loader-container"
  }

}
