import { Component, Input } from '@angular/core';

import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent {
  @Input() user: UserModel | undefined;
  chevronClass: string = "nav-chevron-down"
  navHeaderWrapperClass:string = "nav-header-wrapper";
  
  constructor(private authService: AuthService) {
  }

  toogleDropdown(){
    if(this.chevronClass == "nav-chevron-down"){
      this.chevronClass = "nav-chevron-down rotate-180";
      this.navHeaderWrapperClass = "nav-header-wrapper expand"
    }
    else{
      this.chevronClass = "nav-chevron-down";
      this.navHeaderWrapperClass = "nav-header-wrapper"
    }
  }

  Logout() {
    this.authService.logout();
  }

}
