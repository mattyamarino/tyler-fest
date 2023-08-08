import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { SnackbarMessage } from '../models/models';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class SnackbarComponent implements OnInit{
  stockMessage = 'You Did A Thing!';
  message!: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    this.getMessage();
  }

  getMessage(): void {
    let retStr = this.stockMessage;

    if (this.data.userMessages !== undefined) {

      if(this.data.hasDeletedPerforms) {
        retStr = this.data.userMessages.find((userMessage: SnackbarMessage) => userMessage.showOnlyIfDeletedSubmissions === true).message;
      } else {

        const potentialMessages = [this.stockMessage, this.stockMessage, this.stockMessage];

        this.data.userMessages.forEach((userMessage: SnackbarMessage) => {
          if(!userMessage.showOnlyIfDeletedSubmissions) {
            potentialMessages.push(userMessage.message);
          }
        })
  
        retStr = this.chooseMessage(potentialMessages);

      }
    }

    if(this.data.stuntMessages !== undefined) {
      
      this.data.stuntMessages.forEach((stuntMessage: SnackbarMessage) => {
        if(stuntMessage.showOnlyIfSubmissionNumber === this.data.stuntCompletions || stuntMessage.showOnlyIfPointsMatch === this.data.stuntPoints) {
          retStr = stuntMessage.message;
        }
      });

    } 

    this.message = retStr;
  }

  chooseMessage(messages: string[]): string {
    let index = Math.floor(Math.random() * (messages.length -1));
    return messages[index];
  }
}
