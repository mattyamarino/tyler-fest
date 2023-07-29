import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}



// const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
//   data: {performStunt: this.performStunt},
// });

// dialogRef.afterClosed().subscribe(result => {
//   console.log('The dialog was closed');
//   if(result) {
//     this.updateUser();
//   };
// });  