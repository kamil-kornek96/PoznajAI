import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { faHouse, faSliders, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  faHouse = faHouse;
  faSliders = faSliders;
  faRightFromBracket = faRightFromBracket;
  chevronClass: string = "nav-chevron-down"
  dropDownItemClass: string = "nav-small-item"
  dropDownActive: boolean = true;
  public loggedUser: UserModel | undefined;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.loggedUser = this.authService.loggedUser;
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Funkcja wywołana przy każdej zmianie routingu
        // Sprawdzamy aktualną ścieżkę i dodajemy klasę aktywną na podstawie dopasowania routerLink
        this.setActiveNavItem();
      });

  }

  ngAfterViewInit(){
    this.setActiveNavItem();
  }

  toogleDropdown(){
    if(this.chevronClass == "nav-chevron-down"){
      this.chevronClass = "nav-chevron-down rotate-180";
      this.dropDownItemClass = "nav-small-item active"
      this.dropDownActive = true;
    }
    else{
      this.chevronClass = "nav-chevron-down";
      this.dropDownItemClass = "nav-small-item"
      this.dropDownActive = false;
    }
  }

  setActiveNavItem() {
    const navLinks = document.querySelectorAll('.nav-item');
    const currentUrl = this.router.url;
    console.log(currentUrl)

    navLinks.forEach((link: any) => {
      const routerLink = link.getAttribute('ng-reflect-router-link');
      console.log(routerLink)
      if (routerLink && routerLink === currentUrl) {
        link.classList.add('nav-item-active');
      } else {
        link.classList.remove('nav-item-active');
      }
    });
  }

  Logout() {
    this.authService.logout();
  }
}
