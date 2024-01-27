import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  rightClasses: string = 'right';
  loaderClasses: string = 'loader-container';
  isLogin: boolean = false;

  async ngOnInit() {
    const newUser = localStorage.getItem('newUser');
    console.log(newUser);
    if (newUser) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  loaderOn = () => {
    console.log('on');
    this.rightClasses = 'right right-full';
    this.loaderClasses = 'loader-container loader-center';
    console.log(this.rightClasses, this.loaderClasses);
  };

  loaderOff = () => {
    console.log('off');
    this.rightClasses = 'right';
    this.loaderClasses = 'loader-container';
  };
}
