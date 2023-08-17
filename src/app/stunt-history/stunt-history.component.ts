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
export class StuntHistoryComponent implements OnInit {

  @Input()
  userData: User[] = [];

  users: User[] = [];

  @Input()
  activeUser: User = new User();

  @Input()
  stunts: Stunt[] = [];

  isSuspended!: boolean;
  areStuntsHidden!: boolean;

  constructor(public dialog: MatDialog, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.users = this.userData.slice();

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

  getWitnessName(witnessId: string): string {
    return this.users.find(u => u.id === witnessId)!.firstName;
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
      if (result1 && this.isSuspended) {

        this.toggleUserSuspension();

      } else if (result1) {

        await new Promise(f => setTimeout(f, 500));

        const dialogRef2 = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            isToggleSuspension: true,
            isSuspended: true,
            suspensionActivationCounter: 2
          }
        });

        dialogRef2.afterClosed().subscribe(result2 => {
          if (result2) {

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
      if (result) {
        this.users.forEach(user => this.firestoreService.updateUserStuntsHidden(user.id!, this.areStuntsHidden));
        this.areStuntsHidden = !this.areStuntsHidden
      }
    });
  }

  deletePerformStunt(userId: string, peformanceToUpdate: PerformStunt, toDelete: boolean) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        performStunt: peformanceToUpdate,
        toDelete: toDelete,
        isTogglePerformStunt: true
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const userToUpdate = this.users.find(user => user.id === userId);
        userToUpdate!.performances!.find(peformToUpdate => peformToUpdate.timestamp === peformanceToUpdate.timestamp)!.isDeleted = toDelete;

        this.firestoreService.updateUserStunts(userId, userToUpdate!.performances!);
      };
    });
  }
}

// deletePerformStunt(userId: string, peformanceToUpdate: PerformStunt, toDelete: boolean) {
//   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
//     data: {
//       performStunt: peformanceToUpdate,
//       toDelete: toDelete,
//       isTogglePerformStunt: true
//     }
//   });


//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {

//       const stuntAffected = this.stunts.find(stunt => stunt.id === peformanceToUpdate.stuntId);
//       const willCauseOverwrite = !stuntAffected!.judgedEvent && peformanceToUpdate.points < stuntAffected!.points[stuntAffected!.points.length - 1];
//       const userToUpdate = this.users.find(u => u.id === userId);


//       peformanceToUpdate.isDeleted = toDelete;

//       if (toDelete && willCauseOverwrite) {
//         userToUpdate!.performances!.forEach((pastPerformStunt: PerformStunt) => {
//           if (!pastPerformStunt.isDeleted && pastPerformStunt.points > peformanceToUpdate.points) {
//             let index = stuntAffected!.points.findIndex(pointValue => pointValue === pastPerformStunt.points);
//             pastPerformStunt.points = stuntAffected!.points[index - 1];
//           }

//           if(pastPerformStunt.timestamp === peformanceToUpdate.timestamp) {
//             pastPerformStunt.isDeleted = toDelete;
//           }
//         });
//       }

//       this.firestoreService.updateUserStunts(userId, userToUpdate!.performances!);
//     };
//   });
// }

