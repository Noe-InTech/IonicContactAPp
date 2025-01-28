import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';
import { CreatePage } from './create.page';
import { NavBarPageModule } from '../../components/app-nav-bar/nav-bar.module'; // Correction : importation du module

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatePageRoutingModule,
    NavBarPageModule 
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
