import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
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
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-angularfire-testbed'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-angularfire-testbed');
  });
});
