import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  contactForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient

  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10,15}$')]],
      address: ['']
    });
  }

  ngOnInit() {
    this.setCurrentLocation();
  }

  async setCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const latitude = coordinates.coords.latitude;
      const longitude = coordinates.coords.longitude;

      console.log('Coordonnées récupérées:', latitude, longitude);

      const geocodedAddress = await this.getAddressFromCoordinates(latitude, longitude);

      if (geocodedAddress) {
        this.contactForm.get('address')?.setValue(geocodedAddress);
      } else {
        console.error('Aucune adresse trouvée');
      }
    } catch (error) {
      console.error('Erreur de géolocalisation:', error);
      this.showToast('Impossible de récupérer l\'adresse actuelle.');
    }
  }

  async getAddressFromCoordinates(latitude: number, longitude: number) {
    const apiKey = 'f6619a8778764cdf9c6cd7768ab5b17e';  
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response: any = await this.http.get(apiUrl).toPromise();
      if (response && response.results.length > 0) {
        return response.results[0].formatted;  
      }
      return null;
    } catch (error) {
      console.error('Erreur de récupération de l\'adresse:', error);
      return null;
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    const contactData = new Contact(
      0,
      this.contactForm.value.firstName,
      this.contactForm.value.lastName,
      this.contactForm.value.email,
      this.contactForm.value.phone,
      this.contactForm.value.address
    );

    this.contactService.createContact(contactData).subscribe(
      (response) => {
        if (response && response.id) {
          this.router.navigate(['/contact', response.id]);
          this.showToast('Le contact a été créé avec succès.');
        }
      },
      (error) => {
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
