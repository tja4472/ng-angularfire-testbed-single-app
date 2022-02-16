import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAComponent } from './component-a.component';
import { AppFirebaseModule } from '../../app-firebase.module';

import { AngularFirestore } from '@angular/fire/compat/firestore';

describe.skip('ComponentAComponent', () => {
  let component: ComponentAComponent;
  let fixture: ComponentFixture<ComponentAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentAComponent],
      // imports: [AppFirebaseModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
