import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/models';


@Component({
  selector: 'app-scoring-tower',
  templateUrl: './scoring-tower.component.html',
  styleUrls: ['./scoring-tower.component.css']
})
export class ScoringTowerComponent implements OnInit {

  @Input()
  users!: User[];
  displayedColumns: string[] = ['position', 'name', 'score'];

  constructor() { }

  ngOnInit(): void {
    
  }

}
