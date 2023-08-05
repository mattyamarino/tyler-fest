import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/models';


@Component({
  selector: 'app-scoring-tower',
  templateUrl: './scoring-tower.component.html',
  styleUrls: ['./scoring-tower.component.css']
})
export class ScoringTowerComponent implements OnInit {

  @Input()
  users!: User[];

  @Input()
  activeUser!: User;

  @Output()
  logoutEvent = new EventEmitter();

  displayedColumns: string[] = ['position', 'name', 'score', 'change'];

  constructor() { }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.logoutEvent.emit();
  }

  getChange(user: User): number {
    let prevPos = 0;

    if(this.activeUser !== undefined && this.activeUser.previousOrder !== undefined && this.activeUser.previousOrder!.userList !== undefined) {
      prevPos = this.activeUser!.previousOrder!.userList!.find(u => u.id === user.id)!.position!
    } 

    // if(user.position === prevPos || prevPos === 0) {
    //   return 0;
    // }

    if(prevPos === 0) {
      return 0;
    }

    return prevPos < user.position! ? 1 : -1;
  }

  getChangeAmount(user: User): number {
    const prevPos = this.activeUser!.previousOrder!.userList!.find(u => u.id === user.id)!.position!

    return prevPos < user.position! ? (user.position! - prevPos) : (prevPos - user.position!);
  }
}

