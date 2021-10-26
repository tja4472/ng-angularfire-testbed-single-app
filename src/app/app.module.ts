import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppFirebaseModule } from './app-firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentAModule } from './component-a';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppFirebaseModule,
    ComponentAModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
