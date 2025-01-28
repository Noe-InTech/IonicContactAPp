import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  standalone: false,
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  contactId: number = 0;
  contactDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contactId = +this.route.snapshot.paramMap.get('id')!;
    this.getContactDetails(this.contactId);
  }

  // Méthode pour récupérer les détails du contact
  getContactDetails(id: number) {
    this.contactService.getContactById(id).subscribe(
      (response) => {
        this.contactDetails = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération du contact', error);
      }
    );
  }

  goToEditPage() {
    this.router.navigate([`/contact/edit/${this.contactId}`]);
  }
}
