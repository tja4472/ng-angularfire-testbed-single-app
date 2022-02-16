import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestoreCompatComponent } from './firestore-compat.component';

describe.skip('FirestoreCompatComponent', () => {
  let component: FirestoreCompatComponent;
  let fixture: ComponentFixture<FirestoreCompatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirestoreCompatComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestoreCompatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
