import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { User } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class OneTimeUploadService {

  constructor(private firestoreService: FirestoreService) { }

  onetimeDataUpload(): void {
    this.firestoreService.uploadData(this.hardcodedUsers, this.hardcodedStunts);
  }

  hardcodedUser1: User = {
    firstName: 'Matt',
    abreviation: 'YAM',
    messages: [
      {
        message: 'Yup',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser2: User = {
    firstName: 'Tyler',
    abreviation: 'OVR',
    messages: [
      {
        message: 'Is it weird I know what your thinking right now?'
      },
      {
        message: 'I mean WTF happened to Tickly Tuesday?'
      },
      {
        message: 'FALCON PUUUUNCH!!!!!'
      },
      {
        message: 'I did something to your pillow'
      },
      {
        message: 'Have you heard the good news about Trevor Lawrence, and how he has saved football forever?'
      },
      {
        message: 'What A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!\nWhat A Save!'
      },
      {
        message: 'How in the hell do you have a vetoed submission',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser3: User = {
    firstName: 'Taylor',
    abreviation: 'TUK',
    messages: [
      {
        message: 'You really are the BEST of MANs'
      },
      {
        message: 'I feel like you deserve more points for that, like maybe an extra 20 Tucker points'
      },
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser4: User = {
    firstName: 'Carlos',
    abreviation: 'LOS',    
    messages: [
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser5: User = {
    firstName: 'Craig',
    abreviation: 'KEG',
    messages: [
      {
        message: 'I believe that was what was called a pro gamer move'
      },
      {
        message: 'That was great, not as great as your drives at Top Golf, but still great'
      },
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser6: User = {
    firstName: 'Carter',
    abreviation: 'C3',
    messages: [
      {
        message: 'Paige would be so proud right now'
      },
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser7: User = {
    firstName: 'Jones',
    abreviation: 'TJO',
    messages: [
      {
        message: 'That was great, but Max would have done it 2 seconds faster'
      },
      {
        message: 'I like to think of you as the George Russell of this competition, take that how you will.'
      },
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser8: User = {
    firstName: 'Ryne',
    abreviation: 'RYN',
    messages: [
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser9: User = {
    firstName: 'Sameer',
    abreviation: 'SMR',
    messages: [
      {
        message: ''
      },
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser10: User = {
    firstName: 'Colin',
    abreviation: 'COL',
    messages: [
      {
        message: 'The ride down was amazing right?  I mean so many great stories, I totally didnt write this message before the trip...'
      },
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser11: User = {
    firstName: 'Mouser',
    abreviation: 'MSR',
    messages: [
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedUser12: User = {
    firstName: 'Allan',
    abreviation: 'ALN',
    messages: [
      {
        message: 'You are doing great, aside from that time you tried this stunt and it didnt count.  But otherwise, you are killing it',
        showOnlyIfDeletedSubmissions: true
      },
    ]
  }

  hardcodedStunt1 = {
    name: 'Buy A Stranger A Drink',
    rules: 'it has to be for someone you have never met',
    maxUses: 2,
    points: [1],
    icon: 'cocktail',
  }

  hardcodedStunt2 = {
    name: 'Catch A Fish',
    rules: '',
    maxUses: 2,
    points: [2],
    icon: 'fish'
  }

  hardcodedStunt3 = {
    name: 'Give A Speech',
    rules: 'Talk for two minutes on a topic picked from the box.  Enter judges score below',
    maxUses: 1,
    points: [1, 3],
    icon: 'conference',
    judgedEvent: true,
    messages: [
      {
        message: 'Dude, the topics in that box were rough, the important thing is you tried',
        showOnlyIfPointsMatch: 1
      },
      {
        message: 'Meh, you probably deserved a better score',
        showOnlyIfPointsMatch: 2
      },
      {
        message: 'Congrats, I wish I could have been there to hear it',
        showOnlyIfPointsMatch: 3
      },
    ]
  }

  hardcodedStunt4 = {
    name: 'Karokee',
    rules: 'sing a song',
    maxUses: 1,
    points: [1],
    icon: 'mic'
  }

  hardcodedStunt5 = {
    name: 'Spin The Wheel',
    rules: 'get points if you succeed at the task randomly chosen',
    maxUses: 1,
    points: [2],
    icon: 'spinner',
    messages: [
      {
        message: 'Nice!, really hope you didnt have to eat a bug',
        showOnlyIfSubmissionNumber: 1
      }
    ]
  }

  hardcodedStunt6 = {
    name: 'Beer Pong',
    rules: 'check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row',
    maxUses: 3,
    points: [1, 2, 3],
    icon: 'beer-pong-_1_',
    messages: [
      {
        message: 'You sure know how to get those balls wet',
        showOnlyIfSubmissionNumber: 3
      }
    ]
  }

  hardcodedStunt7 = {
    name: 'Quarters',
    rules: 'check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row',
    maxUses: 3,
    points: [1, 2, 3],
    icon: 'coin'
  }

  hardcodedStunt8 = {
    name: 'Flip Cup',
    rules: 'check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row',
    maxUses: 3,
    points: [1, 2, 3],
    icon: 'paper-cup',
    messages: [
      {
        message: 'Helps to have good teammates, but still counts',
        showOnlyIfSubmissionNumber: 2
      },
      {
        message: 'What cant you flip!?',
        showOnlyIfSubmissionNumber: 3
      }
    ]
  }

  hardcodedStunt9 = {
    name: 'Gambling',
    rules: 'Finish top 3 at gambling night.  First gets: 3pts, Second: 2pts, Third: 1pt',
    maxUses: 1,
    points: [1, 3],
    icon: 'dice',
    judgedEvent: true,
    messages: [
      {
        message: 'Solid podium finish, good job',
        showOnlyIfPointsMatch: 1
      },
      {
        message: 'You are etiher really happy about this, or feel cheated',
        showOnlyIfPointsMatch: 2
      },
      {
        message: 'Wow, that was great!  Now how about spreading some of that cash around',
        showOnlyIfPointsMatch: 3
      },
    ]
  }

  hardcodedStunt10 = {
    name: 'WTF',
    rules: 'when the time is right, you will know',
    maxUses: 2,
    points: [2],
    icon: 'shrug',
    isHidden: true,
    messages: [
      {
        message: 'You got them both!?  I still have no idea what this thing is, but you managed to complete it twice, so thats probably impressive',
        showOnlyIfSubmissionNumber: 2
      }
    ]
  }

  hardcodedUsers = [this.hardcodedUser1, this.hardcodedUser2, this.hardcodedUser3, this.hardcodedUser4, this.hardcodedUser5, this.hardcodedUser6, this.hardcodedUser7, this.hardcodedUser8, this.hardcodedUser9, this.hardcodedUser10, this.hardcodedUser11, this.hardcodedUser12];

  hardcodedStunts = [this.hardcodedStunt1, this.hardcodedStunt2, this.hardcodedStunt3, this.hardcodedStunt4, this.hardcodedStunt5, this.hardcodedStunt6, this.hardcodedStunt7, this.hardcodedStunt8, this.hardcodedStunt9, this.hardcodedStunt10];


}


