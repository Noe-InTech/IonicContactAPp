import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService, } from 'src/app/services/contact.service';

@Component({
  standalone: false,
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  contactForm: FormGroup;
  errorMessage: string = ''; // Message d'erreur global

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10,15}$')]],
      address: ['']
    });
  }

  ngOnInit() { }

  onSubmit() {
    console.log(this.contactForm)
    if (this.contactForm.invalid) {
      return;
    }

    console.log('Formulaire soumis avec les valeurs :', this.contactForm.value);

    if (!this.contactForm.value.email) {
      this.errorMessage = 'L\'email est obligatoire.';
      return;
    }
    console.log(this.contactForm.value.email);
    const contactData = new Contact(
      0,
      this.contactForm.value.firstName,
      this.contactForm.value.lastName,
      this.contactForm.value.email,
      this.contactForm.value.phone,
      this.contactForm.value.address
    );
    console.log(contactData);
    console.log(this.contactForm.value.email);

    this.contactService.createContact(contactData).subscribe(
      (response) => {
        if (response && response.id) {
          this.router.navigate(['/contact', response.id]);
          this.showToast('Le contact a été créé avec succès.');
        } else {
          console.error('ID du contact manquant dans la réponse');
        }
      },
      (error) => {
        console.error('Erreur lors de la création du contact :', error);
        if (error.error.message === 'The email has already been taken.') {
          this.errorMessage = 'Cet email est déjà utilisé.';
          this.contactForm.get('email')?.setErrors({ emailTaken: true });
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        }
      }
    );
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}