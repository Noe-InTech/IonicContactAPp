import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Assurez-vous d'importer AuthService
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8000/api/contact';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createContact(contactData: any): Observable<any> {
    return new Observable(observer => {
      this.authService.getToken().then(token => {
        console.log('Token récupéré :', token);

        if (!token) {
          observer.error('Token manquant');
          return;
        }

        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json');

        this.http.post<ApiResponse>(`${this.apiUrl}`, contactData, { headers }).subscribe(
          response => {
            if (response.errors && response.errors.email) {
              observer.error(response.errors.email[0]);  // L'erreur spécifique à l'email
            } else {
              observer.next(response);
            }
          },
          error => observer.error(error), // Passer l'erreur si autre que l'email
          () => observer.complete()
        );
      }).catch(error => {
        observer.error('Erreur récupération token');
      });
    });
  }







  getContactById(id: number): Observable<any> {
    return new Observable((observer) => {
      this.authService.getToken().then((token) => {
        if (!token) {
          observer.error('Token manquant');
          return;
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.get(`${this.apiUrl}/${id}`, { headers }).subscribe(
          (response) => {
            observer.next(response); // Retourne les détails du contact
          },
          (error) => {
            observer.error(error);
          }
        );
      }).catch((error) => {
        observer.error('Erreur récupération token');
      });
    });
  }


  getContacts(): Observable<any> {
    return new Observable((observer) => {
      this.authService.getToken().then((token) => {
        if (!token) {
          console.error('Token manquant');
          observer.error('Token manquant');
          return;
        }

        console.log('Token validé :', token); // Debug pour vérifier le token

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.get(this.apiUrl, { headers }).subscribe(
          (response) => {
            observer.next(response); // Retourne les contacts
          },
          (error) => {
            observer.error(error);
          }
        );
      }).catch((error) => {
        console.error('Erreur récupération token', error);
        observer.error('Erreur récupération token');
      });
    });



  }



  updateContact(id: number, contactData: any): Observable<any> {
    return new Observable(observer => {
      this.authService.getToken().then(token => {
        if (!token) {
          observer.error('Token manquant');
          return;
        }

        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json');

        this.http.put(`${this.apiUrl}/${id}`, contactData, { headers }).subscribe(
          response => observer.next(response),
          error => observer.error(error),
          () => observer.complete()
        );
      }).catch(error => {
        observer.error('Erreur récupération token');
      });
    });
  }

  deleteContact(id: number): Observable<any> {
    return new Observable(observer => {
      this.authService.getToken().then(token => {
        if (!token) {
          observer.error('Token manquant');
          return;
        }

        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`);

        this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
          response => observer.next(response),
          error => observer.error(error),
          () => observer.complete()
        );
      }).catch(error => {
        observer.error('Erreur récupération token');
      });
    });
  }



}
