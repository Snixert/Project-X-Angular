/* The account module defines the feature module for the account section of 
the application along with metadata about the module. The 'imports' specify
which other angular modules are required by this module, and the declarations
state which components belong to this module. For more info see:
https://angular.io/docs/ts/latest/guide/ngmodule.html

The account module is hooked into the main app inside the app-routing.module.ts
with lazy loading
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
