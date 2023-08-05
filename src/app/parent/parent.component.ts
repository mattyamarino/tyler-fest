import { Component, OnInit } from '@angular/core';
import { PerformStunt, PreviousOrder, Stunt, User } from '../models/models';
import { FirestoreService } from '../firestore.service';
import {CookieService} from 'ngx-cookie-service';
import { OneTimeUploadService } from '../one-time-upload.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  users: User[] = [];
  previousOrder: PreviousOrder = new PreviousOrder();
  userMap: Map<string, User> = new Map();
  stunts: Stunt[] = [];
  loading = true;
  activeStunt: Stunt | null = null;
  activeUser: User = new User;
  loggedIn?: boolean;
  key = 'prod';
  adminKey = 'gamemaster';
  loginFail = false;
  storedCreds?: string;

  constructor(private firestoreService: FirestoreService, private cookieService: CookieService, private oneTimeUploadService: OneTimeUploadService) { }

  ngOnInit(): void {
    // this.oneTimeUploadService.onetimeDataUpload();
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
          });
          this.initializeData(unformattedUsers);
        });
      } else {
        this.stunts.forEach(stunt => {
          stunt.completions = new Set();
          stunt.deletedCompletions = new Set();
        });
        this.initializeData(unformattedUsers);
      }
    });
  }

  initializeData(unformattedUsers: User[]): void {
    this.previousOrder = new PreviousOrder();
    this.initializePerformStunts(unformattedUsers);
    this.transformUsersForScoreboard(unformattedUsers);

    this.users = unformattedUsers;

    this.configureLogin();

    if(this.activeStunt !== null) {
      this.activeStunt = this.stunts.find(stunt => stunt.id === this.activeStunt!.id!)!
    }

    this.loading = false;
  }

  initializePerformStunts(userList: User[]): User[] {
    userList.forEach((user: User) => {
      user.performances = user.jsonPerforms ? JSON.parse(user.jsonPerforms) : [];
      user.score = 0;

      user.performances!.forEach((performance: PerformStunt) => {
        performance.stuntName = this.stunts.find(stunt => stunt.id === performance.stuntId)!.name;
        if(!performance.isDeleted) {
          user.score = user.score! + performance.points;
        }
      });
    });

    return userList
  }

  transformUsersForScoreboard(userList: User[]): User[] {
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

      if(this.previousOrder.timestamp === undefined) {
        this.previousOrder.timestamp = Date.now();
        this.previousOrder.userList = [];
      }

      this.previousOrder.userList!.push({id:user.id, firstName: user.firstName, abreviation: user.abreviation, position: user.position});
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

    if(creds[0] === 'spectate') {
      this.loggedIn = true;
      this.loginFail = false;
      this.activeUser.id = 'spectator';
      this.storedCreds = credsString;
      
    } else if(creds[0].toLocaleLowerCase().trim() === 'admin' && creds[1].trim() === this.adminKey) {
      this.loggedIn = true;
      this.loginFail = false;
      this.activeUser.id = 'admin';
      this.cookieService.set('_auth_cookie', credsString);
      this.storedCreds = credsString;

    } else if(creds[1].trim() === this.key) {

      this.users.forEach((user: User, index: number) => {
        if(user.firstName.toLocaleLowerCase() === creds[0].toLocaleLowerCase().trim()) {
          user.previousOrder = this.setPreviousOrder(user);
          this.stuntCompletions(user);
          this.loggedIn = true;
          user.loggedIn = true;
          this.activeUser = user;
          this.cookieService.set('_auth_cookie', credsString);
          this.storedCreds = credsString;
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

  setPreviousOrder(user: User): PreviousOrder {
    let prevOrder = new PreviousOrder();

    if(user.jsonPreviousOrder !== undefined) {
      prevOrder = JSON.parse(user.jsonPreviousOrder);
    }

    if(prevOrder.timestamp === undefined || Date.now() > prevOrder!.timestamp + 600000) {
      this.firestoreService.updateUserPreviousOrder(user.id!, this.previousOrder);
    }

    return prevOrder;
  }

  stuntCompletions(user: User): void {
    user.performances?.forEach(performance => {
      if(performance.isDeleted) {
        this.stunts.find(stunt => stunt.id === performance.stuntId)!.deletedCompletions!.add(JSON.stringify(performance));
      } else {
        this.stunts.find(stunt => stunt.id === performance.stuntId)!.completions!.add(JSON.stringify(performance));
      } 
    });
  }

  toggleStunt(stuntId: string): void {
    this.activeStunt = this.activeStunt === null ? this.stunts.find(stunt => stunt.id === stuntId)! : null;
  }

  logout(): void {
    this.cookieService.delete('_auth_cookie', '/');
    this.storedCreds = undefined;
    this.loggedIn = false;
    this.activeUser = new User();
    this.getData();
  }

}
