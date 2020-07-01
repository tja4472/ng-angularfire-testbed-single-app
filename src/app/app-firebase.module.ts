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
const shouldUseEmulator = () => {
  console.log('environment.useEmulator>', environment.useEmulator);
  return environment.useEmulator;
};

// experimentalForceLongPolling required for Cypress testing.
// Cannot connect to Firestore emulator
// https://github.com/cypress-io/cypress/issues/6350#issuecomment-587708852

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
        shouldUseEmulator()
          ? {
              host: 'localhost:8080',
              ssl: false,
              experimentalForceLongPolling: true,
            }
          : {},
    },
  ],
})
export class AppFirebaseModule {}
