import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentAComponent } from './component-a';
import { ComponentBComponent } from './components/component-b';
import { FirestoreCompatComponent } from './components/firestore-compat';

const routes: Routes = [
  { path: 'componentA', component: ComponentAComponent },
  { path: 'componentB', component: ComponentBComponent },
  { path: 'firestoreCompat', component: FirestoreCompatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
