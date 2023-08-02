import { Component, Input, OnInit } from '@angular/core';
import { PerformStunt, Stunt, User } from '../models/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-stunt-history',
  templateUrl: './stunt-history.component.html',
  styleUrls: ['./stunt-history.component.css']
})
export class StuntHistoryComponent implements OnInit{

  @Input()
  users: User[] = [];

  @Input()
  userMap: Map<string, User> = new Map();

  constructor(public dialog: MatDialog, private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.initializeData();
  }

  initializeData(): void {
    this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
    this.users.forEach(user => {
      user.performances!.sort((a, b) => a.stuntName!.localeCompare(b.stuntName!) || b.timestamp - a.timestamp);
    });
  }

  deletePerformStunt(userId: string, performance: PerformStunt, toDelete: boolean) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        performStunt: performance,
        toDelete: toDelete
      },
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.users.find(user => user.id === userId)!.performances!.find(peformToUpdate => peformToUpdate.timestamp === performance.timestamp)!.isDeleted = toDelete;

        this.firestoreService.updateUserStunts(userId, this.userMap.get(userId)!.performances!);
      };
    });  
  }
}
