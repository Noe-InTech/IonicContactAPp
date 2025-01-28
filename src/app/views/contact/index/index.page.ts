import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { ToastController } from '@ionic/angular'; // Importer le ToastController

@Component({
  standalone: false,
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchText: string = '';
  isLoading: boolean = false;

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController 
  ) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe({
      next: (response) => {
        this.contacts = response.map((contactData: any) => new Contact(
          contactData.id,
          contactData.firstName,
          contactData.lastName,
          contactData.email,
          contactData.phone,
          contactData.address
        ));
        this.filteredContacts = this.contacts;
        console.log('Contacts récupérés :', this.contacts);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contacts :', err);
        this.showToast('Erreur lors de la récupération des contacts.', 'danger');
      },
    });
  }

  filterContacts() {
    this.isLoading = true;

    // Simulation d'un délai de 1 seconde
    setTimeout(() => {
      if (!this.searchText) {
        this.filteredContacts = this.contacts;
      } else {
        this.filteredContacts = this.contacts.filter(contact => {
          return contact.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }

      // Cacher le loader après le filtrage
      this.isLoading = false;
    }, 1000); // Délai simulé de 1 seconde
  }

  deleteContact(contactId: number) {
    this.contacts = this.contacts.filter((contact) => contact.id !== contactId);
    this.filterContacts(); 
    this.showToast('Contact supprimé avec succès.', 'success');
  }

  // Fonction pour afficher un toast
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      color: color, 
      position: 'top', 
    });
    toast.present(); 
  }
}
