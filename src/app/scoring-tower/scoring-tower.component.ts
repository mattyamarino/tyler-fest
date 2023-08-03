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
    if(this.activeUser === undefined || this.activeUser.previousOrder === undefined || this.activeUser.previousOrder!.userOrder === undefined || this.activeUser.previousOrder!.userOrder!.get(user.id!) === user.position) {
      return 0;
    }

    return this.activeUser.previousOrder!.userOrder!.get(user.id!)?.position! > user.position! ? 1 : -1;
  }

}
