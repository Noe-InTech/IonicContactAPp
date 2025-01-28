import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NavBarPageRoutingModule } from './nav-bar-routing.module';
import { NavBarPage } from './nav-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavBarPageRoutingModule
  ],
  declarations: [NavBarPage],
  exports: [NavBarPage] // Ajouté pour permettre son utilisation dans d'autres modules
})
export class NavBarPageModule {}
