import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PerformStunt, PreviousOrder, Stunt, User } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }


  getUsers() {
    return this.firestore.collection('users').valueChanges({ idField: 'id' });
  }

  getStunts() {
    return this.firestore.collection('stunts').get();
  }

  updateUserStunts(id: string, performs: PerformStunt[]) {
    const jsonStr = JSON.stringify(performs);

    return this.firestore.collection('users').doc(id).update({
      jsonPerforms: jsonStr
    })
      .then(() => {
        console.log("User " + id + " successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  updateUserPreviousOrder(id: string, previousOrder: PreviousOrder) {
    const jsonStr = JSON.stringify(previousOrder);

    return this.firestore.collection('users').doc(id).update({
      jsonPreviousOrder: jsonStr
    })
      .then(() => {
        console.log("User " + id + " successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  updateUserSuspension(id: string, isSuspended: boolean) {
    return this.firestore.collection('users').doc(id).update({
      isSuspended: isSuspended
    })
      .then(() => {
        console.log("User " + id + " successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  updateUserSecretRoles(id: string, secretRoles: string[]) {
    return this.firestore.collection('users').doc(id).update({
      secretRoles: secretRoles
    })
      .then(() => {
        console.log("User " + id + " successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }


  updateUserStuntsHiddenAndSecretRoles(id: string, showHidden: boolean, secretRoles: string[]) {
    return this.firestore.collection('users').doc(id).update({
      showHidden: showHidden,
      secretRoles: secretRoles
    })
      .then(() => {
        console.log("User " + id + " successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }


  // ONE TIME FUNCTIONS
  uploadData(users: User[], stunts: Stunt[]) {

    users.forEach(user => {
      this.firestore.collection('users')
        .add(user)
        .then((docRef) => {
          console.log("User written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });

    stunts.forEach(stunt => {
      this.firestore.collection('stunts')
        .add(stunt)
        .then((docRef) => {
          console.log("Stunt written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
  }
}
