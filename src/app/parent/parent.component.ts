import { Component, OnInit } from '@angular/core';
import { PerformStunt, Stunt, User } from '../models/models';
import { FirestoreService } from '../firestore.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  users: User[] = [];
  stuntUsers: User[] = [];
  userMap: Map<string, User> = new Map();
  stunts: Stunt[] = [];
  stuntMap: Map<string, Stunt> = new Map();
  loading = true;
  activeStunt: Stunt | null = null;
  activeUser: User = new User;
  loggedIn?: boolean;
  key = 'prod';
  adminKey = 'gamemaster';
  loginFail = false;
  storedCreds?: string;

  constructor(private firestoreService: FirestoreService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getData();
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
    userList.forEach((user: User) => {
      user.performances = user.jsonPerforms ? JSON.parse(user.jsonPerforms) : [];
      user.score = 0;

      user.performances!.forEach((performance: PerformStunt) => {
        let points = this.stuntMap.get(performance.stuntId)!.points;
        performance.stuntName = this.stuntMap.get(performance.stuntId)!.name;
        if(!performance.isDeleted) {
          user.score = user.score! + points;
        }
      });
    });

    return userList
  }

  transformUsersForScoreboard(userList: User[]): User[] {
    this.stunts = Array.from(this.stuntMap.values());
    this.stunts.sort((a, b) => a.name.localeCompare(b.name));
    userList.sort((a, b) =>  b.score! - a.score! || a.abreviation.localeCompare(b.abreviation));

    let tiedPosition = 0;

    userList.forEach((user: User, index: number) => {
      if (userList[index - 1] && userList[index - 1].score === user.score) {
        user.position = tiedPosition + 1;
        user.isTied = true;
      } else {
        tiedPosition = index;
        user.position = index + 1;
      }

      this.userMap.set(user.id!, user);
    });
    return userList;
  }

  configureLogin(): void {
    let creds = this.getCookie('_auth_cookie') !== undefined ? this.getCookie('_auth_cookie') : this.storedCreds;

    if(creds !== undefined) {
      this.authenticate(creds!);
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

    if(creds[0].toLocaleLowerCase().trim() === 'admin' && creds[1].trim() === this.adminKey) {
      this.loggedIn = true;
      this.loginFail = false;
      this.activeUser.id = 'admin';
      this.cookieService.set('_auth_cookie', credsString);
      this.storedCreds = credsString;

    } else if(creds[1].trim() === this.key) {

      this.stuntUsers = [...this.users];

      this.users.forEach((user: User, index: number) => {
        if(user.firstName.toLocaleLowerCase() === creds[0].toLocaleLowerCase().trim()) {
          this.stuntCompletions(user);
          this.loggedIn = true;
          user.loggedIn = true;
          this.activeUser = user;
          this.cookieService.set('_auth_cookie', credsString);
          this.storedCreds = credsString;
          this.stuntUsers.splice(index,1);
          this.loginFail = false;
        }
      });

      if(!this.loggedIn) {
        this.loggedIn = false;
        this.loginFail = true;
      }
    } else {
      this.loggedIn = false;
      this.loginFail = true;
    }
  }

  stuntCompletions(user: User): void {
    user.performances?.forEach(performance => {
      if(performance.isDeleted) {
        this.stuntMap.get(performance.stuntId)!.deletedCompletions!.add(JSON.stringify(performance));
      } else {
        this.stuntMap.get(performance.stuntId)!.completions!.add(JSON.stringify(performance));
      } 
    });
  }

  toggleStunt(stuntId: string): void {
    this.activeStunt = this.activeStunt === null ? this.stuntMap.get(stuntId)! : null;
  }

  logout(): void {
    this.cookieService.delete('_auth_cookie', '/');
    this.storedCreds = undefined;
    this.loggedIn = false;
    this.activeUser = new User();
    this.getData();
  }

}
