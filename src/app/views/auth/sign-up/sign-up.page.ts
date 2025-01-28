import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular'; 

@Component({
  standalone: false,
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController 
  ) { }

  ngOnInit() { }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.register(this.signUpForm.value).subscribe(
        (response) => {
          console.log('Inscription réussie', response);
          
          this.presentToast('Inscription réussie!', 'success');

          this.authService.login({
            email: this.signUpForm.value.email,
            password: this.signUpForm.value.password
          }).subscribe(
            (loginResponse) => {
              console.log('Connexion réussie', loginResponse);
              this.router.navigate(['/home']);
            },
            (loginError) => {
              console.error('Erreur lors de la connexion', loginError);
              this.presentToast('Erreur lors de la connexion', 'danger');
            }
          );
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
          this.presentToast('Erreur lors de l\'inscription', 'danger');
        }
      );
    } else {
      console.log('Le formulaire n\'est pas valide');
      this.presentToast('Le formulaire n\'est pas valide', 'warning');
    }
  }
}
