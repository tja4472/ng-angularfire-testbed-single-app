import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-firestore-compat',
  templateUrl: './firestore-compat.component.html',
  styleUrls: ['./firestore-compat.component.css'],
})
export class FirestoreCompatComponent implements OnInit {
  constructor(
    public readonly auth: AngularFireAuth,
    public readonly firestore: AngularFirestore
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
