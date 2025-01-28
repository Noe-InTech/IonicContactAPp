import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './views/auth/login/login.page';
import { SignUpPage } from './views/auth/sign-up/sign-up.page';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: 'home', 
    loadChildren: () => import('./views/contact/index/index.module').then((m) => m.IndexPageModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  

  {
    path: 'sign-up',
    loadChildren: () => import('./views/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule),canActivate: [NoAuthGuard] 
  },
  {
    path: 'login',
    loadChildren: () => import('./views/auth/login/login.module').then( m => m.LoginPageModule),canActivate: [NoAuthGuard] 
  },

  { 
    path: 'contact-create', 
    loadChildren: () => import('./views/contact/create/create.module').then((m) => m.CreatePageModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'contact-edit', 
    loadChildren: () => import('./views/contact/edit/edit.module').then((m) => m.EditPageModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'app-nav-bar', 
    loadChildren: () => import('./views/components/app-nav-bar/nav-bar.module').then((m) => m.NavBarPageModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'contact/:id', 
    loadChildren: () => import('./views/contact/detail/detail.module').then((m) => m.DetailPageModule), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'contact/edit/:id', 
    loadChildren: () => import('./views/contact/edit/edit.module').then((m) => m.EditPageModule), 
    canActivate: [AuthGuard] 
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
