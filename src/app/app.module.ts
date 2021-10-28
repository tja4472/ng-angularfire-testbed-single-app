import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppFirebaseModule } from './app-firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentAModule } from './component-a';
import { ComponentBModule } from './components/component-b';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppFirebaseModule,
    ComponentAModule,
    ComponentBModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
