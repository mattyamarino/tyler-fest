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
  stunts: Stunt[] = [];
  stuntMap: Map<string, Stunt> = new Map();
  loading = true;
  activeStunt: Stunt | null = null;
  activeUser: User = new User;
  loggedIn?: boolean;
  key = 'prod';

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    // this.onetimeDataUpload();
    this.getData();
  }


  configureLogin(): void {
    let auth_cookie = this.getCookie('_auth_cookie');

    if(auth_cookie !== undefined) {
      this.authenticate(auth_cookie);
    } else {
      this.loggedIn = false;
    }
  }

  getCookie(cookiename: string) {
    /* a function to find a cookie based on its name */
    const res = document.cookie.match('\\b' + cookiename + "=([^;]*)\\b");
    // document.cookie returns all cookies for this url
    return res ? res[1] : undefined;
    // return the regex capture if it has content, otherwise return undefined
}

  authenticate(credsString: string): void {
    let creds = credsString.split('~');

    if(creds[1] === this.key) {
      this.users.forEach(user => {
        if(user.firstName.toLocaleLowerCase() === creds[0].toLocaleLowerCase()) {
          this.loggedIn = true;
          this.activeUser = user;
          user.loggedIn = true;
          document.cookie = '_auth_cookie=' + credsString;
        }
      });
    } else {
      this.loggedIn = false;
    }
  }


  getData(): void {
    this.firestoreService.getUsers().subscribe(async userRes => {
      let unformattedUsers = <User[]>userRes;
      if (this.stunts.length === 0) {
        this.firestoreService.getStunts().subscribe(stuntRes => {

          stuntRes.docs.forEach(doc => {
            let stunt = <Stunt>doc.data();
            stunt.id = doc.id;
            stunt.completions = new Set();
            stunt.deletedCompletions = new Set();
            this.stunts.push(stunt);
            this.stuntMap.set(<string>stunt.id, stunt);
          });
          this.initializeData(unformattedUsers);
        });
      } else {
        this.stunts.forEach(stunt => {
          stunt.completions = new Set();
          stunt.deletedCompletions = new Set();
          this.stuntMap.set(<string>stunt.id, stunt);        
        });
        this.initializeData(unformattedUsers);
      }
    });
  }

  initializeData(unformattedUsers: User[]): void {
    this.initializePerformStunts(unformattedUsers);
    this.transformUsersForScoreboard(unformattedUsers);

    this.users = unformattedUsers;

    this.configureLogin();

    if(this.activeStunt !== null) {
      this.activeStunt = this.stuntMap.get(this.activeStunt.id!)!
    }

    this.loading = false;
  }

  initializePerformStunts(userList: User[]): User[] {
    let tiedPosition = 0;

    userList.forEach((user: User, index: number) => {
      user.performances = user.jsonPerforms ? JSON.parse(user.jsonPerforms) : [];
      user.score = 0;

      user.performances!.forEach((performance: PerformStunt) => {
        let points = this.stuntMap.get(performance.stuntId)!.points;

        if(performance.isDeleted) {
          this.stuntMap.get(performance.stuntId)!.deletedCompletions!.add(JSON.stringify(performance));
        } else {
          this.stuntMap.get(performance.stuntId)!.completions!.add(JSON.stringify(performance));
        }
        
        user.score = user.score! + points;
      });


      if (userList[index - 1] && userList[index - 1].score === user.score) {
        user.position = tiedPosition + 1;
      } else {
        tiedPosition = index;
        user.position = index + 1;
      }
    });

    return userList
  }

  transformUsersForScoreboard(userList: User[]): User[] {
    this.stunts = Array.from(this.stuntMap.values());
    this.stunts.sort((a, b) => a.name.localeCompare(b.name));
    userList.sort((a, b) => { return b.score! - a.score!; });
    return userList;
  }

  toggleStunt(stuntId: string): void {
    this.activeStunt = this.activeStunt === null ? this.stuntMap.get(stuntId)! : null;
  }

  onetimeDataUpload(): void {
    this.firestoreService.uploadData(this.hardcodedUsers, this.hardcodedStunts, []);
  }

}
