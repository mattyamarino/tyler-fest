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

  displayedColumns: string[] = ['position', 'name', 'score'];

  constructor() { }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.logoutEvent.emit();
  }

}
