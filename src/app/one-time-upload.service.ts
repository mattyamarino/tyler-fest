import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { User } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class OneTimeUploadService {

  constructor(private firestoreService: FirestoreService) { }

    onetimeDataUpload(): void {
    this.firestoreService.uploadData(this.hardcodedUsers, this.hardcodedStunts);
  }

  hardcodedUser1: User = {
    firstName: 'Matt',
    abreviation: 'YAM',
  }

  hardcodedUser2: User = {
    firstName: 'Tyler',
    abreviation: 'OVR',
  }

  hardcodedUser3: User = {
    firstName: 'Taylor',
    abreviation: 'TUK',
  }

  hardcodedUser4: User = {
    firstName: 'Carlos',
    abreviation: 'LOS',
  }

  hardcodedUser5: User = {
    firstName: 'Craig',
    abreviation: 'CRG',
  }

  hardcodedUser6: User = {
    firstName: 'Carter',
    abreviation: 'CAR',
  }

  hardcodedUser7: User = {
    firstName: 'Travis',
    abreviation: 'TRV',
  }

  hardcodedUser8: User = {
    firstName: 'Rian',
    abreviation: 'RIN',
  }

  hardcodedUser9: User = {
    firstName: 'Sameer',
    abreviation: 'SAM',
  }

  hardcodedUser10: User = {
    firstName: 'Collin',
    abreviation: 'COL',
  }

  hardcodedStunt1 = {
    name: 'Buy A Stranger A Drink',
    rules: 'it has to be for someone you have never met',
    maxUses: 2,
    points: 1,
    icon: 'cocktail'
  }

  hardcodedStunt2 = {
    name: 'Catch A Fish',
    rules: '',
    maxUses: 2,
    points: 2,
    icon: 'fish'
  }

  hardcodedStunt3 = {
    name: 'Give A Speech',
    rules: 'has to be in front of a group, and be at least 2 min',
    maxUses: 1,
    points: 2,
    icon: 'conference'
  }

  hardcodedStunt4 = {
    name: 'Karokee',
    rules: 'sing a song',
    maxUses: 1,
    points: 1,
    icon: 'singsong'
  }

  hardcodedStunt5 = {
    name: 'Suicide Karokee',
    rules: 'pick someone to choose a song for you to sing',
    maxUses: 1,
    points: 2,
    icon: 'singsong'
  }

  hardcodedStunt6 = {
    name: 'Beer Pong',
    rules: 'you have to win for it to count',
    maxUses: 3,
    points: 1,
    icon: 'beer-pong-_1_'
  }

  hardcodedStunt7 = {
    name: 'Quarters',
    rules: 'you have to win for it to count',
    maxUses: 3,
    points: 1,
    icon: 'coin'
  }

  hardcodedStunt8 = {
    name: 'Flip Cup',
    rules: 'you have to win for it to count',
    maxUses: 3,
    points: 1,
    icon: 'paper-cup'
  }

  hardcodedUsers = [this.hardcodedUser1, this.hardcodedUser2, this.hardcodedUser3, this.hardcodedUser4, this.hardcodedUser5, this.hardcodedUser6, this.hardcodedUser7, this.hardcodedUser8, this.hardcodedUser9, this.hardcodedUser10];

  hardcodedStunts = [this.hardcodedStunt1, this.hardcodedStunt2, this.hardcodedStunt3, this.hardcodedStunt4, this.hardcodedStunt5, this.hardcodedStunt6, this.hardcodedStunt7, this.hardcodedStunt8];


}


