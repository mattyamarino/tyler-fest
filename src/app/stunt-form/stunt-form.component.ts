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

  @Output() 
  stuntEvent = new EventEmitter<Stunt>();

  performStunt: PerformStunt =  new PerformStunt();

  stuntForm = new FormGroup({
    witness: new FormControl(''),
    description: new FormControl('')
  });

  userNames: string[] = [];

  bystander = 'Some Rando';

  saving = false;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.initializeUserNames();
  }

  initializeUserNames(): void {
    this.users.forEach((user) => {
      if(this.activeUser.id !== user.id) {
        this.userNames.push(user.firstName);
      }
    });

    this.userNames.sort();
    this.userNames.push(this.bystander);
  }

  closeStunt(): void {
    this.stuntEvent.emit(this.activeStunt);
  }

  counter(i: number) {
    return new Array(i);
  }

  printForm() {
    console.log(this.stuntForm)
  }

  isDisabled(): boolean {
    return this.stuntForm.get('witness')?.value === '' || this.stuntForm.get('description')?.value === '' ? true : false;
  }

  onSubmit() {
    if(!this.saving) {
      this.saving = true;

      this.performStunt.witnessId = this.getUserId(this.stuntForm.get('witness')!.value!)!;
      this.performStunt.description = this.stuntForm.get('description')!.value!
      this.performStunt.stuntId = this.activeStunt.id!
      this.performStunt.timestamp = Date.now();

      this.activeUser.performances?.push(this.performStunt);

      this.firestoreService.updateUserStunts(this.activeUser.id!, this.activeUser.performances!);

      this._snackBar.openFromComponent(SnackbarComponent, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2500
      });
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

  deletePerformStunt() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {performStunt: this.performStunt},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        // delete record
      };
    });  
  }
}
