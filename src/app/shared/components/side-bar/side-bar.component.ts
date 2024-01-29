import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';
import {
  faHouse,
  faSliders,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { CourseService } from 'src/app/services/course.service';
import { UserCoursesModel } from 'src/app/models/user-courses.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  faHouse = faHouse;
  faSliders = faSliders;
  faRightFromBracket = faRightFromBracket;
  public loggedUser: UserModel | undefined;
  public userCourses: UserCoursesModel | undefined;

  constructor(
    public authService: AuthService,
    private router: Router,
    public courseService: CourseService,
  ) {
    this.loggedUser = this.authService.loggedUser;
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Funkcja wywołana przy każdej zmianie routingu
        // Sprawdzamy aktualną ścieżkę i dodajemy klasę aktywną na podstawie dopasowania routerLink
        this.setActiveNavItem();
      });

    this.courseService.getUserCourses().subscribe((response) => {
      this.userCourses = response.data;
      console.log(this.userCourses);
    });
  }

  ngAfterViewInit() {
    this.setActiveNavItem();
  }

  setActiveNavItem() {
    const navLinks = document.querySelectorAll('.nav-item');
    const currentUrl = this.router.url;
    console.log(currentUrl);

    navLinks.forEach((link: any) => {
      const routerLink = link.getAttribute('ng-reflect-router-link');
      console.log(routerLink);
      if (routerLink && routerLink === currentUrl) {
        link.classList.add('nav-item-active');
      } else {
        link.classList.remove('nav-item-active');
      }
    });
  }
}
