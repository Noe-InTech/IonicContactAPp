import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { NavBarPageModule } from '../../components/app-nav-bar/nav-bar.module';
import { ContactCardComponent } from '../../components/contact-card/contact-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule, 
    NavBarPageModule,
  ],
  declarations: [IndexPage,ContactCardComponent]
})
export class IndexPageModule { }
