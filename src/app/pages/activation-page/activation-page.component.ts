import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './activation-page.component.html',
  styleUrls: ['./activation-page.component.scss'],
})
export class ActivationPageComponent {
  rightClasses: string = 'right right-full';
  loaderClasses: string = 'loader-container loader-center';
  isSuccess: boolean = false;
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) {}

  async ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    if (token == undefined) {
      this.router.navigate(['/welcome']);
    }
    this.auth.activateEmail(token).subscribe(
      (res) => {
        this.loaderOff();
        this.isSuccess = true;
        console.log('Success:', res);
      },
      (error) => {
        console.error('Error:', error);
        if (error.error.message == 'Email already confirmed') {
          this.errorMessage = 'Konto zostało już potwierdzone';
        } else {
          this.errorMessage = 'Błędny token aktywacyjny';
        }
        this.loaderOff();
        this.isSuccess = false;
      },
    );
  }

  goToLogin() {
    this.router.navigate(['/welcome']);
  }

  loaderOn() {
    this.rightClasses = 'right right-full';
    this.loaderClasses = 'loader-container loader-center';
  }

  loaderOff() {
    this.rightClasses = 'right';
    this.loaderClasses = 'loader-container';
  }
}
