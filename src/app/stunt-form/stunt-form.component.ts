import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerformStunt, Stunt, User } from '../models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { FirestoreService } from '../firestore.service';


@Component({
  selector: 'app-stunt-form',
  templateUrl: './stunt-form.component.html',
  styleUrls: ['./stunt-form.component.css']
})
export class StuntFormComponent implements OnInit{

  @Input()
  activeStunt: Stunt = new Stunt();

  @Input()
  activeUser: User = new User();

  @Input()
  users: User[] = [];

  @Input()
  userMap: Map<string, User> = new Map();

  @Output() 
  stuntEvent = new EventEmitter<Stunt>();

  stuntForm = new FormGroup({
    witness: new FormControl(''),
    description: new FormControl('')
  });

  bystander = 'Some Rando';

  saving = false;

  pastPerformances: PerformStunt[] = [];
  deletedPerformances: PerformStunt[] =[];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.initializeUserNames();
    this.initializePastPerformances();
  }

  initializeUserNames(): void {
    this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
    this.users.push({
      abreviation: 'bystander',
      firstName: this.bystander
    });
  }

  initializePastPerformances(): void {
    this.activeStunt.completions!.forEach(jsonPerform => {
      this.pastPerformances.push(JSON.parse(jsonPerform));
    });
    
    this.activeStunt.deletedCompletions!.forEach(deleteJsonPerform => {
      this.deletedPerformances.push(JSON.parse(deleteJsonPerform));
    });
    this.sortPerformanceLists();
  }

  sortPerformanceLists(): void {
    this.pastPerformances.sort((a, b) => b.timestamp - a.timestamp);
    this.deletedPerformances.sort((a, b) => b.timestamp - a.timestamp);
  }

  closeStunt(): void {
    this.stuntEvent.emit(this.activeStunt);
  }

  counter(i: number) {
    return new Array(i);
  }

  isOdd(index: number): boolean {
    let bool = index % 2 !== 0;
    return bool
  }

  isDisabled(): boolean {
    return this.stuntForm.get('witness')?.value === '' || this.stuntForm.get('description')?.value === '' ? true : false;
  }

  onSubmit() {
    if(!this.saving) {
      this.saving = true;

      const performStunt = {
        witnessId: this.getUserId(this.stuntForm.get('witness')!.value!)!,
        description: this.stuntForm.get('description')!.value!.trim(),
        stuntId: this.activeStunt.id!,
        timestamp: Date.now()
      }

      this.pastPerformances.push(performStunt);

      this.activeUser.performances!.push(performStunt);

      this.firestoreService.updateUserStunts(this.activeUser.id!, this.activeUser.performances!);

      this._snackBar.openFromComponent(SnackbarComponent, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2500
      });

      this.stuntEvent.emit(this.activeStunt);
    }
  }

  getUserId(name: string) {
    if(name === this.bystander) {
      return 'bystander';
    }

    let retStr

    this.users.forEach((user) => {
      if(user.firstName === name) {
        retStr = user.id
      }
    });

    return retStr;
  }

  getPointStr(): string {
    return this.activeStunt.points !== 1 ? 'pts' : 'pt'
  }

  deletePerformStunt(performance: PerformStunt, toDelete: boolean) {
    if(toDelete || this.pastPerformances.length < this.activeStunt.maxUses) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          performStunt: performance,
          toDelete: toDelete
        },
      });
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log('RESULT: ', result);
  
          if(toDelete) {
            this.pastPerformances.forEach((performStunt: PerformStunt, index: number) => {
              if(performStunt.timestamp === performance.timestamp ) {
                performStunt.isDeleted = true;
                this.pastPerformances.splice(index, 1);
                this.deletedPerformances.push(performStunt);
              }
            });
          } else {
            this.deletedPerformances.forEach((performStunt: PerformStunt, index: number)  => {
              if(performStunt.timestamp === performance.timestamp) {
                performStunt.isDeleted = false;
                this.deletedPerformances.splice(index, 1);
                this.pastPerformances.push(performStunt);
              }
            });
          }
  
          this.sortPerformanceLists();
  
          this.activeUser.performances!.find(peformToUpdate => peformToUpdate.timestamp === performance.timestamp)!.isDeleted = toDelete;
  
          this.firestoreService.updateUserStunts(this.activeUser.id!, this.activeUser.performances!);
        };
      });  
    }
  }
}
