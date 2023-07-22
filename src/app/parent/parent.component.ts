import { Component, OnInit } from '@angular/core';
import { PerformStunt, Stunt, User } from '../models/models';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  

  mockUser1: User = {
    id: 'userId1',
    firstName: 'Aname',
    abreviation: 'AAA',
  }

  mockUser2: User = {
    id: 'userId2',
    firstName: 'Bname',
    abreviation: 'BBB'
  }

  mockUser3: User = {
    id: 'userId3',
    firstName: 'Cname',
    abreviation: 'CCC'
  }

  mockUser4: User = {
    id: 'userId4',
    firstName: 'Dname',
    abreviation: 'DDD'
  }

  mockStunt = {
    id: 'stuntId',
    name: 'someName',
    description: 'this is the stunt name', 
    maxUses: 2,
    points: 3
  }

  mockPerform1 = {
    id: 'someId',
    userId: 'userId1',
    witnessId: 'someId',
    stuntId: 'stuntId',
    description: 'I bought someone a beer',
    timestamp: 1689985973
  }

  mockPerform2 = {
    id: 'someId',
    userId: 'userId1',
    witnessId: 'someId',
    stuntId: 'stuntId',
    description: 'I bought someone a beer',
    timestamp: 1689985973
  }

  mockPerform3 = {
    id: 'someId',
    userId: 'userId2',
    witnessId: 'someId',
    stuntId: 'stuntId',
    description: 'I bought someone a beer',
    timestamp: 1689985973
  }

  mockPerform4 = {
    id: 'someId',
    userId: 'userId2',
    witnessId: 'someId',
    stuntId: 'stuntId',
    description: 'I bought someone a beer',
    timestamp: 1689985973
  }

  mockPerform5 = {
    id: 'someId',
    userId: 'userId3',
    witnessId: 'someId',
    stuntId: 'stuntId',
    description: 'I bought someone a beer',
    timestamp: 1689985973
  }

  mockPerform6 = {
    id: 'someId',
    userId: 'userId6',
    witnessId: 'someId',
    stuntId: 'stuntId',
    description: 'I bought someone a beer',
    timestamp: 1689985973
  }

  mockUsers = [this.mockUser1, this.mockUser2, this.mockUser3, this.mockUser4];

  mockStunts = [this.mockStunt];

  mockPerformances = [this.mockPerform1, this.mockPerform2, this.mockPerform3, this.mockPerform4, this.mockPerform5, this.mockPerform6];






  users: User[] = [];
  userMap: any;
  stunts: Stunt[] = [];
  stuntMap: any;
  performaces: PerformStunt[] = [];

  constructor() { }

  ngOnInit(): void {
    // getData
    this.initializeMaps();
    this.initializePerformStunts();
  }

  initializeMaps(): void {
    this.userMap = new Map(this.users.map(user => [user.id, user]));
    this.stuntMap = new Map(this.stunts.map(stunt => [stunt.id, stunt]));
  }

  initializePerformStunts(): void {
    this.performaces.forEach((performance: PerformStunt) => {
      let points = this.stuntMap.get(performance.stuntId).points
      this.userMap.get(performance.userId).score = this.userMap.get(performance.userId).score + points;
    });
  }

}
