/*
=====================================================
; File Name: app-routing.module.ts
; Author: Ace Baugh
; Date: 06/12/2023
; File Description: App routing module
=====================================================
*/

// import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
//import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
//import { AuthGuard } from './shared/guards/auth.guard';
//import { RoleGuard } from './shared/guards/role.guard';
//import { NotFoundComponent } from './shared/not-found/not-found.component';
//import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
//import { SignInComponent } from './pages/sign-in/sign-in.component';
//import { SignUpComponent } from './pages/sign-up/sign-up.component';
//import { ContactComponent } from './pages/contact/contact.component';
//import { ShiftsComponent } from './pages/shifts/shifts.component';

// routes
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      }
    ]
  },
  {
    path: 'about',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: AboutComponent,
      }
    ]
  },
  {
    path: 'contact',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ContactComponent,
      }
    ]
  },
  {
    path: 'terms',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: TermsComponent,
      }
    ]
  },
  {
    path: 'privacy',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: PrivacyComponent,
      }
    ]
  },
];

// export
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
