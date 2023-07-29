import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PerformStunt, Stunt, User } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }


  getUsers() {
    return this.firestore.collection('users').get();
  }

  getStunts() {
    return this.firestore.collection('stunts').get();
  }

  getPerformStunts() {
    return this.firestore.collection('performStunts').get();
  }


// ONE TIME FUNCTIONS
  uploadData(users: User[], stunts: Stunt[], performs: PerformStunt[]) {

    users.forEach(user => {
      this.firestore.collection('users')
      .add(user)
      .then((docRef) => {
        console.log("Item History written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    });

    stunts.forEach(stunt => {
      this.firestore.collection('stunts')
      .add(stunt)
      .then((docRef) => {
        console.log("Item History written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    });
  }
}
