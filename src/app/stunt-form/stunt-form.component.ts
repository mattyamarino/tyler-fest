import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerformStunt, Stunt, User } from '../models/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  stuntEvent = new EventEmitter<PerformStunt>();

  performStunt: PerformStunt =  new PerformStunt();

  stuntForm = new FormGroup({
    witness: new FormControl(''),
    description: new FormControl('')
  });

  userNames: string[] = [];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.filterActiveUser();
  }

  filterActiveUser(): void {
    this.users.forEach((user) => {
      if(this.activeUser.id !== user.id) {
        this.userNames.push(user.firstName);
      }
    });
  }

  closeStunt(): void {
    this.stuntEvent.emit(this.performStunt);
  }

  counter(i: number) {
    return new Array(i);
  }

  printForm() {
    console.log(this.stuntForm)
  }

  onSubmit() {
    this._snackBar.open("message", "action", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
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
