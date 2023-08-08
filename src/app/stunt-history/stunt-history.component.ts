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

  @Input()
  activeUser: User = new User();

  isSuspended!: boolean;
  areStuntsHidden!: boolean;

  constructor(public dialog: MatDialog, private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.isSuspended = this.users[0].isSuspended !== undefined ? this.users[0].isSuspended : false;
    this.areStuntsHidden = this.users[0].showHidden !== undefined ? !this.users[0].showHidden : true;

    this.initializeData();
  }

  initializeData(): void {
    this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
    this.users.forEach(user => {
      user.performances!.sort((a, b) => a.stuntName!.localeCompare(b.stuntName!) || b.timestamp - a.timestamp);
    });
  }

  getPointStr(pointsValue: number): string {
    return pointsValue !== 1 ? 'pts' : 'pt'
  }

  toggleEventSuspension() {

    const dialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        isToggleSuspension: true,
        isSuspended: !this.isSuspended,
        suspensionActivationCounter: 1
      }
    });

    dialogRef1.afterClosed().subscribe(async result1 => {
      if(result1 && this.isSuspended) {
        
        this.toggleUserSuspension();

      } else if (result1) {

        await new Promise(f => setTimeout(f, 600));

        const dialogRef2 = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            isToggleSuspension: true,
            isSuspended: true,
            suspensionActivationCounter: 2
          }
        });

        dialogRef2.afterClosed().subscribe(result2 => {
          if(result2) {

            this.toggleUserSuspension();
          
          };
        });  

      }
    });  
  }

  toggleUserSuspension(): void {
    this.users.forEach(user => this.firestoreService.updateUserSuspension(user.id!, !this.isSuspended));
    this.isSuspended = !this.isSuspended
  }

  toggleMysteryEvent(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        isToggleHiddenStunts: true,
        hideStunts: !this.areStuntsHidden,
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result) {
        this.users.forEach(user => this.firestoreService.updateUserStuntsHidden(user.id!, this.areStuntsHidden));
        this.areStuntsHidden = !this.areStuntsHidden
      }
    });  
  }

  deletePerformStunt(userId: string, performance: PerformStunt, toDelete: boolean) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        performStunt: performance,
        toDelete: toDelete,
        isTogglePerformStunt: true
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.users.find(user => user.id === userId)!.performances!.find(peformToUpdate => peformToUpdate.timestamp === performance.timestamp)!.isDeleted = toDelete;

        this.firestoreService.updateUserStunts(userId, this.userMap.get(userId)!.performances!);
      };
    });  
  }
}
