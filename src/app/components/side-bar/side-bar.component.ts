import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserModel } from 'src/app/core/auth/models/user.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  public loggedUser: UserModel | undefined;
  constructor(private authService: AuthService) {
    console.log(this.authService.loggedUser)
    this.loggedUser = this.authService.loggedUser;
  }
  
  Logout(){
      this.authService.setToken(null);
  }
}

