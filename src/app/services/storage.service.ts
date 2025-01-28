import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {}

  // Récupérer un élément du storage
  getItem(key: string): Promise<string | null> {
    return Promise.resolve(localStorage.getItem(key));
  }

  // Sauvegarder un élément dans le storage
  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, value);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Supprimer un élément du storage
  removeItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(key);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
