import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharcreationComponent } from './charcreation/charcreation.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'creation',component:CharcreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,CharcreationComponent]
