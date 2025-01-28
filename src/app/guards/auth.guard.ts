import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    // Vérifie si l'utilisateur est authentifié via AuthService
    const isAuthenticated = await this.authService.isAuthenticated();

    if (isAuthenticated) {
      return true; // Accès autorisé
    }

    // Redirige vers la page de connexion si non authentifié
    this.router.navigate(['/login']);
    return false;
  }
}
