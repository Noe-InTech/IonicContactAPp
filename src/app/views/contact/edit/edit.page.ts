import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { ToastController } from '@ionic/angular';  

@Component({
  standalone: false,
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  contactId: number = 0;
  contactDetails: Contact | null = null;
  isLoading: boolean = false;
  showDeleteModal: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private toastController: ToastController  
  ) {}

  ngOnInit() {
    this.contactId = +this.route.snapshot.paramMap.get('id')!;
    this.getContactDetails(this.contactId);
  }

  getContactDetails(id: number) {
    this.isLoading = true;
    this.contactService.getContactById(id).subscribe(
      (response) => {
        this.contactDetails = new Contact(
          response.id,
          response.firstName,
          response.lastName,
          response.email,
          response.phone,
          response.address
        );
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération du contact', error);
        this.isLoading = false;
      }
    );
  }

  saveContact() {
    if (this.contactDetails) {
      this.contactService.updateContact(this.contactId, this.contactDetails).subscribe(
        (response) => {
          console.log('Contact mis à jour avec succès:', response);
          this.router.navigate([`/contact/${this.contactId}`]);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du contact', error);
        }
      );
    }
  }

  // Ouvrir la modale de confirmation
  confirmDelete() {
    this.showDeleteModal = true;
  }

  // Fermer la modale de confirmation
  dismissModal(confirmed: boolean) {
    this.showDeleteModal = false;
    if (confirmed) {
      this.deleteContact();
    }
  }

  // Supprimer le contact
  deleteContact() {
    if (this.contactId) {
      this.showDeleteModal = false;
  
      this.contactService.deleteContact(this.contactId).subscribe(
        async (response) => {
          console.log('Contact supprimé avec succès:', response);
          
          // Affichage du toast de succès
          const toast = await this.toastController.create({
            message: 'Contact supprimé avec succès.',
            duration: 2000,
            color: 'success',
            position: 'top',
          });
          await toast.present();  
          
          this.router.navigate(['/home']);
        },
        async (error) => {
          console.error('Erreur lors de la suppression du contact', error);
          
          const toast = await this.toastController.create({
            message: 'Erreur lors de la suppression du contact.',
            duration: 2000,
            color: 'danger',
            position: 'top',
          });
          await toast.present(); 
        }
      );
    }
  }
  
  
  
}
