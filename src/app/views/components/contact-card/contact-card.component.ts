import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ToastController } from '@ionic/angular';  // Importer le ToastController
import { Router } from '@angular/router';  // Importer Router pour la redirection

@Component({
  standalone: false,
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent {
  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() id!: number;

  @Output() deleteContact = new EventEmitter<number>();  // Émettre l'ID du contact à supprimer
  @Output() contactDeleted = new EventEmitter<void>();  // Émettre un événement lorsque le contact est supprimé avec succès

  showModal: boolean = false; // État de la modal

  constructor(
    private contactService: ContactService,
    private toastController: ToastController,  // Injecter le ToastController
    private router: Router  // Injecter le Router pour la redirection
  ) {}

  // Fonction pour afficher les détails du contact
  viewContact(id: number) {
    // Rediriger vers la page de détail du contact avec l'ID
    this.router.navigate([`/contact/${id}`]);
  }

  confirmDelete() {
    this.showModal = true; // Ouvrir la modal
  }

  dismissModal(confirmed: boolean) {
    this.showModal = false; // Fermer la modal
    if (confirmed) {
      this.deleteContactPermanently(); // Appeler la fonction pour supprimer le contact
    }
  }

  deleteContactPermanently() {
    this.contactService.deleteContact(this.id).subscribe(
      async (response) => {
        console.log('Contact supprimé avec succès:', response);
        this.contactDeleted.emit(); // Émettre l'événement de suppression
        this.showModal = false;
        
        // Afficher un toast de succès après suppression
        const toast = await this.toastController.create({
          message: 'Contact supprimé avec succès.',
          duration: 2000, 
          color: 'success', 
          position: 'top', 
        });
        toast.present(); 
        window.location.reload();
      },
      async (error) => {
        console.error('Erreur lors de la suppression du contact', error);
        
        const toast = await this.toastController.create({
          message: 'Erreur lors de la suppression du contact.',
          duration: 2000,
          color: 'danger', 
          position: 'top',
        });
        toast.present(); 
      }
    );
  }
}
