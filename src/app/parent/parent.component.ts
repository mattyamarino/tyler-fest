import { Component, OnInit } from '@angular/core';
import { PerformStunt, Stunt, User } from '../models/models';
import { FirestoreService } from '../firestore.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {


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


  users: User[] = [];
  userMap: Map<string, User> = new Map();
  stunts: Stunt[] = [];
  stuntMap: Map<string, Stunt> = new Map();
  performaces: PerformStunt[] = [];
  loading = true;
  activeStunt: Stunt | null = null;
  activeUser: User = new User;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    // this.onetimeDataUpload();

    this.getData();
  }

  getData(): void {
    let userData = this.firestoreService.getUsers();
    let stuntData = this.firestoreService.getStunts();
    let performData = this.firestoreService.getPerformStunts();

    forkJoin([userData, stuntData, performData]).subscribe((res) => {
      res[0].docs.forEach(doc => {
        let user = <User>doc.data();
        user.id = doc.id;
        user.score = 0;
        this.users.push(user);
      });
      res[1].docs.forEach(doc => {
        let stunt = <Stunt>doc.data();
        stunt.id = doc.id;
        stunt.completions = 0;
        this.stunts.push(stunt);
      });
      res[2].docs.forEach(doc => {
        let performance = <PerformStunt>doc.data();
        performance.id = doc.id;
        this.performaces.push(performance);
      });


      this.initializeMaps();
      this.initializePerformStunts();
      this.transformUsersForScoreboard();

      // TEMP CODE
      this.activeUser = this.users[1];

      this.loading = false;
    });
  }

  initializeMaps(): void {
    this.users.forEach((user) => {
      this.userMap.set(<string>user.id, user);
    });
    this.stunts.forEach((stunt) => {
      this.stuntMap.set(<string>stunt.id, stunt);
    });
  }

  initializePerformStunts(): void {
    this.performaces.forEach((performance: PerformStunt) => {
      let points = this.stuntMap.get(performance.stuntId)!.points;
      let completions = this.stuntMap.get(performance.stuntId)!.completions
      this.stuntMap.get(performance.stuntId)!.completions = completions ? completions + 1 : 1
      let score = this.userMap.get(performance.userId)!.score ? this.userMap.get(performance.userId)!.score : 0;
      this.userMap.get(performance.userId)!.score = score! + points;
    });
  }

  transformUsersForScoreboard(): void {
    this.stunts = Array.from(this.stuntMap.values());
    this.users = Array.from(this.userMap.values());
    this.users.sort((a,b) => {  return b.score! - a.score!;  });
    let tiedPosition = 0;
    this.users.forEach((user: User, index: number) => {
      if(this.users[index - 1] && this.users[index -1].score === user.score) {
        user.position = tiedPosition + 1;
      } else {
        tiedPosition = index;
        user.position = index + 1;
      }
    });
  }

  toggleStunt(event: Stunt): void {
    this.activeStunt = this.activeStunt === null ? event : null;
  }

  onetimeDataUpload(): void {
    this.firestoreService.uploadData(this.hardcodedUsers, this.hardcodedStunts, []);
  }

}
