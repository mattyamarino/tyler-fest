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

  witnesses: User[] = [];

  @Input()
  userMap: Map<string, User> = new Map();

  @Output() 
  stuntEvent = new EventEmitter<Stunt>();

  stuntForm = new FormGroup({
    witness: new FormControl(''),
    description: new FormControl(''),
    points: new FormControl(0)
  });

  saving = false;

  pastPerformances: PerformStunt[] = [];
  deletedPerformances: PerformStunt[] =[];

  points: number = 0;
  judgedPoints: number[] = [];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.initializePoints();
    this.initializeUserNames();
    this.initializePastPerformances();
  }

  initializePoints(): void {
    const index = this.activeStunt.completions!.size < this.activeStunt.points.length ? this.activeStunt.completions!.size : 0

    this.points = this.activeStunt.points[index];

    if(this.activeStunt.judgedEvent) {
      let counter = this.activeStunt.points[0];
      while(counter <= this.activeStunt.points[1]) {
        this.judgedPoints.push(counter);
        counter++;
      }
    }
  }

  initializeUserNames(): void {
    this.witnesses = Array.from(this.userMap.values()).filter(user => user.id !== this.activeUser.id);
    this.witnesses.sort((a, b) => a.firstName.localeCompare(b.firstName));
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
    let judgedPointsInvalid = this.activeStunt.judgedEvent ? this.stuntForm.get('points')?.value === 0 : false

    return this.stuntForm.get('witness')?.value === '' || this.stuntForm.get('description')?.value === ''  || judgedPointsInvalid ? true : false;
  }

  showStunt(): boolean {
    if(this.activeStunt.isHidden) {
      return this.activeUser.showHidden ? true : false;
    }

    return true;
  }

  onSubmit() {
    if(!this.saving) {
      this.saving = true;
      const pointsToSave = this.activeStunt.judgedEvent ? this.stuntForm.get('points')!.value! : this.points;

      const performStunt = {
        witnessId: this.getUserId(this.stuntForm.get('witness')!.value!)!,
        description: this.stuntForm.get('description')!.value!.trim(),
        stuntId: this.activeStunt.id!,
        timestamp: Date.now(),
        points: pointsToSave
      }

      this.pastPerformances.push(performStunt);

      this.activeUser.performances!.push(performStunt);

      this.firestoreService.updateUserStunts(this.activeUser.id!, this.activeUser.performances!);

      this._snackBar.openFromComponent(SnackbarComponent, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5300,
        data: {
          hasError: false,
          userMessages: this.activeUser.messages,
          stuntMessages: this.activeStunt.messages,
          stuntCompletions: this.pastPerformances.length,
          stuntPoints: pointsToSave,
          hasDeletedPerforms: this.deletedPerformances.length > 0 ? true :false
        }
      });

      this.stuntEvent.emit(this.activeStunt);
    }
  }

  getUserId(name: string): string {
    return this.witnesses.find(user => user.firstName === name)!.id!
  }

  isActivePoints(index: number): boolean  {
    return (this.activeStunt.completions!.size) === index
  }

  getPointStr(pointsValue: number , isForJudgedEvent?: boolean): string {
    if(isForJudgedEvent) {
      return `${this.judgedPoints[0]}-${this.judgedPoints[this.judgedPoints.length -1]}pts`
    }

    return pointsValue !== 1 ? 'pts' : 'pt'
  }

  deletePerformStunt(performance: PerformStunt, toDelete: boolean) {
    if(toDelete || this.pastPerformances.length < this.activeStunt.maxUses) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          performStunt: performance,
          toDelete: toDelete,
          isTogglePerformStunt: true
        }
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
