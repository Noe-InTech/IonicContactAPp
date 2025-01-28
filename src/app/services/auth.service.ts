import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service'; // Importer StorageService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par l'URL de votre API

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService) {
    // Charger l'utilisateur courant depuis le Storage au démarrage
    this.storageService.getItem('currentUser').then(storedUser => {
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    });
  }

  // Fonction d'enregistrement
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Fonction de connexion
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Fonction de déconnexion
  async logout(): Promise<Observable<any>> {
    // Effacer les données utilisateur et token stockées
    await this.storageService.removeItem('auth_token');
    await this.storageService.removeItem('currentUser');
    this.currentUserSubject.next(null);
  
    // Attendre les en-têtes
    const headers = await this.getAuthHeaders();
  
    // Appel à l'API pour la déconnexion avec les en-têtes
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }
  
  // Fonction pour récupérer les en-têtes d'authentification
  private async getAuthHeaders(): Promise<HttpHeaders> {
    const token = await this.storageService.getItem('auth_token');
    console.log('Token récupéré:', token);  // Vérifiez ici que le token est valide et n'est pas null
  
    if (!token) {
      throw new Error('Token non trouvé');
    }
  
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  

  // Fonction pour définir l'utilisateur courant (utilisé après la connexion)
  setCurrentUser(user: any): void {
    console.log('Sauvegarde de l\'utilisateur:', user);
    this.storageService.setItem('currentUser', JSON.stringify(user));  // Utilisation du StorageService
    this.storageService.setItem('auth_token', user.token);  // Sauvegarder le token JWT dans le Storage
    this.currentUserSubject.next(user);
  }
  

  // Fonction pour obtenir l'utilisateur courant
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Sauvegarder le token dans le Storage
  saveToken(token: string): void {
    this.storageService.setItem('auth_token', token);  // Utilisation du StorageService
  }

  // Vérifier si l'utilisateur est authentifié
  async isAuthenticated(): Promise<boolean> {
    const token = await this.storageService.getItem('auth_token');
    return !!token;
  }

  getToken(): Promise<string | null> {
    return this.storageService.getItem('auth_token');  // Utilisation du StorageService
  }
  
  
}
