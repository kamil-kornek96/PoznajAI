import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserModel } from 'src/app/core/auth/models/user.model';
import { faHouse, faSliders, faRightFromBracket, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  faHouse = faHouse;
  faSliders = faSliders;
  faRightFromBracket = faRightFromBracket;
  public loggedUser: UserModel | undefined;
  constructor(private authService: AuthService) {
    console.log(this.authService.loggedUser)
    this.loggedUser = this.authService.loggedUser;
  }
  
  Logout(){
      this.authService.logout()
  }
}

