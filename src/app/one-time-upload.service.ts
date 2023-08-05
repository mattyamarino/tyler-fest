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
    abreviation: 'KEG',
  }

  hardcodedUser6: User = {
    firstName: 'Carter',
    abreviation: 'C3',
  }

  hardcodedUser7: User = {
    firstName: 'Jones',
    abreviation: 'TJO',
  }

  hardcodedUser8: User = {
    firstName: 'Ryne',
    abreviation: 'RYN',
  }

  hardcodedUser9: User = {
    firstName: 'Sameer',
    abreviation: 'SMR',
  }

  hardcodedUser10: User = {
    firstName: 'Colin',
    abreviation: 'COL',
  }

  hardcodedUser11: User = {
    firstName: 'Mouser',
    abreviation: 'MSR',
  }

  hardcodedUser12: User = {
    firstName: 'Allan',
    abreviation: 'ALN',
  }

  hardcodedStunt1 = {
    name: 'Buy A Stranger A Drink',
    rules: 'it has to be for someone you have never met',
    maxUses: 2,
    points: [1],
    icon: 'cocktail'
  }

  hardcodedStunt2 = {
    name: 'Catch A Fish',
    rules: '',
    maxUses: 2,
    points: [2],
    icon: 'fish'
  }

  hardcodedStunt3 = {
    name: 'Give A Speech',
    rules: 'Talk for two minutes on a topic picked from the box.  Enter judges score below',
    maxUses: 1,
    points: [1, 3],
    icon: 'conference',
    judgedEvent: true
  }

  hardcodedStunt4 = {
    name: 'Karokee',
    rules: 'sing a song',
    maxUses: 1,
    points: [1],
    icon: 'mic'
  }

  hardcodedStunt5 = {
    name: 'Spin The Wheel',
    rules: 'get points if you succeed at the task randomly chosen',
    maxUses: 1,
    points: [2],
    icon: 'spinner'
  }

  hardcodedStunt6 = {
    name: 'Beer Pong',
    rules: 'check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row',
    maxUses: 3,
    points: [1, 2, 3],
    icon: 'beer-pong-_1_'
  }

  hardcodedStunt7 = {
    name: 'Quarters',
    rules: 'check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row',
    maxUses: 3,
    points: [1, 2, 3],
    icon: 'coin'
  }

  hardcodedStunt8 = {
    name: 'Flip Cup',
    rules: 'check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row',
    maxUses: 3,
    points: [1, 2, 3],
    icon: 'paper-cup'
  }

  hardcodedStunt9 = {
    name: 'Gambling',
    rules: 'Finish top 3 at gambling night.  First gets: 3pts, Second: 2pts, Third: 1pt',
    maxUses: 1,
    points: [1, 3],
    icon: 'dice',
    judgedEvent: true
  }

  hardcodedStunt10 = {
    name: 'WTF',
    rules: 'when the time is right, you will know',
    maxUses: 2,
    points: [2],
    icon: 'shrug',
    isHidden: true
  }

  hardcodedUsers = [this.hardcodedUser1, this.hardcodedUser2, this.hardcodedUser3, this.hardcodedUser4, this.hardcodedUser5, this.hardcodedUser6, this.hardcodedUser7, this.hardcodedUser8, this.hardcodedUser9, this.hardcodedUser10, this.hardcodedUser11, this.hardcodedUser12];

  hardcodedStunts = [this.hardcodedStunt1, this.hardcodedStunt2, this.hardcodedStunt3, this.hardcodedStunt4, this.hardcodedStunt5, this.hardcodedStunt6, this.hardcodedStunt7, this.hardcodedStunt8, this.hardcodedStunt9, this.hardcodedStunt10];


}


