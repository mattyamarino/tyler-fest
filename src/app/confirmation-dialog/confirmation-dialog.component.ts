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

  getActionLabel(): string {
    return this.data.toDelete ? 'Delete' : "Restore";
  }

  getSuspensionTitle(): string {
    if(!this.data.isSuspended) {
      return 'Reactivate Event?  This will allow all users to complete and update stunts again';
    }

    switch (this.data.suspensionActivationCounter) {
      case 1: return 'Suspend event? This will prevent all users from adding or updating stunt completions';
      default: return 'Ok, but like are you really sure?';
    }
  }

  getSuspensionButtonLabel(): string  {
    if(!this.data.isSuspended) {
      return 'Reactivate Event';
    }

    switch (this.data.suspensionActivationCounter) {
      case 1: return 'Confirm';
      default: return 'Suspend Event';
    }
  }
}