import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone:true,
  imports:[RouterOutlet,FontAwesomeModule,CommonModule,RouterModule,HttpClientModule],
})
export class HeaderComponent {

  

  categories: any[] = [];
  showHeader: boolean = true;

  constructor(  public authService: AuthenticationService,  
                private http: HttpClient,
                private router: Router

  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('/dashboard'); // Hide header on dashboard route
      }
    });

}

navigateToCourses(categoryId: number): void {
  this.router.navigate(['/courses', categoryId]); // Navigate to CoursesComponent with categoryId
}

logout(): void {
  this.authService.setLoginStatus(false);
}

}
