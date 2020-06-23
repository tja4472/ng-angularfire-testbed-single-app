import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
/*
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
*/
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFirestoreModule,
  SETTINGS as FIRESTORE_SETTINGS,
} from '@angular/fire/firestore';
// import { AngularFirePerformanceModule } from '@angular/fire/performance';

import { environment } from '../environments/environment';

// const shouldUseEmulator = () => true;
const shouldUseEmulator = () => environment.useEmulator;

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule.enablePersistence(),
    // AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    // AngularFirePerformanceModule,
  ],
  // exports: [AngularFireModule, AngularFireAuthModule],
  // providers: [ScreenTrackingService, UserTrackingService],
  providers: [
    {
      provide: FIRESTORE_SETTINGS,
      useFactory: () =>
        shouldUseEmulator() ? { host: 'localhost:8080', ssl: false } : {},
    },
  ],
})
export class AppFirebaseModule {}
