/**
 * @group emulator-required
 */

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { of } from 'rxjs';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment.emulator-real';

/*
Don't use import { AppFirebaseModule } from './app-firebase.module' as jest does not 
know about angular environment file handling.


*/

describe('AppComponent(emulator)', () => {
  beforeEach(async () => {
    const authStub: any = {
      authState: {},
    };

    const storeStub = {
      doc() {
        return of(null);
      },
    };

    const authMock = jest.fn();
    const storeMock = jest.fn();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],

      providers: [
        { provide: AngularFireAuth, useValue: authMock },
        { provide: AngularFirestore, useValue: storeMock },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // console.log('l>', environment.useEmulator);
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-angularfire-testbed'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-angularfire-testbed');
  });
});
