import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class SnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  getMessage(): string {
    if(this.data.messages === undefined) {
      return 'You Did A Thing!'
    }

    else {
      let index = Math.floor(Math.random() * (this.data.messages.length - 0 + 1) + 0);
      return this.data.messages[index];
    }
  }
}
