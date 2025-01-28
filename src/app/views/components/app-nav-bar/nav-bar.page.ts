import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.page.html',
  styleUrls: ['./nav-bar.page.scss'],
  standalone: false,
})
export class NavBarPage implements OnInit {
  userMenuOpen = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authService = authService;


  }

  ngOnInit() { }

  onUserMenuClick() {
    this.userMenuOpen = !this.userMenuOpen;
  }



  // Méthode pour déconnecter l'utilisateur
  logout() {
    this.router.navigate(['/login']);

    this.authService.logout();
  }
}
