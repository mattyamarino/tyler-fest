import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Stunt, User } from './models/models';

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
        message: 'You should be insecure with how secure your position is in this game'
      },
      {
        message: 'People might call you \'Toddler Tucker\' but after that win, their the ones cleaning up your shit'
      },
      {
        message: 'Right now, you are as hot as your cousin'
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
        message: 'You made Monterrey proud'
      },
      {
        message: 'Congratulations you just earned one free blowjob from Mel (per Tyler)'
      },
      {
        message: 'Good job, Marcelo just shit his pants'
      },
      {
        message: 'This moment is as good a moment as a bag of chips with a dollop of sour cream and hot sauce'
      },
      {
        message: 'Landman? more like Lord of the Land'
      },
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
        message: 'Craig the keg, my best friend, with big muscles and lots of homies'
      },
      {
        message: 'After that invite as many prostitues as you want, but dont tell Ryne'
      },
      {
        message: 'Show Gordon those nipples'
      },
      {
        message: 'You might have broken your back, but point wise, you are in the front'
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
        message: 'You might be from Elgin, but your balls are Elginormous'
      },
      {
        message: 'Keep Going Bitch'
      },
      {
        message: 'You should text Paige, because after that win she probably wants to make out'
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
        message: 'That was cool, but not as cool as your dad'
      },
      {
        message: 'Sending away Derek Carr for Jimmy G is like selling a Honda Accord so you can buy a Toyota Camry, but you know good job'
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
        message: 'The Admiral is certainly proud of that one'
      },
      {
        message: 'The Cold Beer Bandit Strikes Again!'
      },
      {
        message: 'Reed might be a bitch, but you arent'
      },
      {
        message: 'Fuck the noise, keep your head in the game'
      },
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
        message: 'Welcome to the family, you handsome motherfucker'
      },
      {
        message: 'Jessie may want third base, but you just hit a home run'
      },
      {
        message: 'That was as good as leftovers in a fridge for Rhone'
      },
      {
        message: 'You have tits on you, I\'ll give you that'
      },
      {
        message: 'That was better than blacking out in New Orleans'
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
        message: 'You had hope during that stunt, but later Faith wil be the one tickling your balls'
      },
      {
        message: 'Kaz might take big shits, but that... was the shit'
      },
      {
        message: 'Heistand\'s a bitch and we both know it'
      },
      {
        message: 'Shots fired, and I dont mean into a 7-11 celing'
      },
      {
        message: 'Cool, lets wrap some houses and run from the cops to celebrate'
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
        message: 'Where in the fuck is Drew Abata?'
      },
      {
        message: 'That one was for Taylor'
      },
      {
        message: 'That shit right there... Mojo\'s tail is wagging hard'
      },
      {
        message: 'You were a Treasurer, but you were the real treaure'
      },
      {
        message: 'Shelby def wants to gobble that cock now (per Tyler)'
      },
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

  hardcodedStunt1: Stunt = {
    name: 'Buy A Stranger A Drink',
    rules: 'Should be bought for the person(s) you know the least.  Must give a toast about the person you bought a drink for. Both submissions cant be completed at the same time.',
    maxUses: 2,
    points: [1],
    icon: 'cocktail',
  }

  hardcodedStunt2: Stunt = {
    name: 'Catch A Fish',
    rules: '',
    maxUses: 2,
    points: [2],
    icon: 'fish'
  }

  hardcodedStunt3: Stunt = {
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

  hardcodedStunt4: Stunt = {
    name: 'Karokee',
    rules: 'Sing a song',
    maxUses: 1,
    points: [2],
    icon: 'mic'
  }

  hardcodedStunt5: Stunt = {
    name: 'Spin The Wheel',
    rules: 'Get points if you succeed at the task randomly chosen, enter the points Lord Tyler Tells you after you complete the tsk',
    maxUses: 3,
    points: [0,3],
    judgedEvent: true,
    icon: 'spinner',
    messages: [
      {
        message: 'Nice!, really hope you didnt have to eat a bug',
        showOnlyIfSubmissionNumber: 1
      }
    ]
  }

  hardcodedStunt6: Stunt = {
    name: 'Beer Pong',
    rules: 'Check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row. Can be done with a teammate or solo. You cannot play with the same partner or oponents twice in a row.',
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

  hardcodedStunt7: Stunt = {
    name: 'Quarters',
    rules: 'Check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row',
    maxUses: 3,
    points: [1, 2, 3],
    icon: 'coin'
  }

  hardcodedStunt8: Stunt = {
    name: 'Flip Cup',
    rules: 'Check the first box if you win, the second if you get back to back wins, and the third if you can pull off three in a row. Compete as a team of 3, you cant have the same team two games in a row',
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

  hardcodedStunt9: Stunt = {
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

  hardcodedStunt10: Stunt = {
    name: 'WTF',
    rules: 'when the time is right, you will know',
    maxUses: 2,
    points: [-1, 1],
    judgedEvent: true,
    icon: 'shrug',
    isHidden: true,
    messages: [
      {
        message: 'Well its over, finally, forever, done',
        showOnlyIfSubmissionNumber: 2
      }
    ]
  }

  hardcodedStunt11: Stunt = {
    name: 'Stack Cup',
    rules: 'Just ask Tyler how this one works.  Loser HAS to mark a submission at -1pt, everyone else that played gets 1pt',
    maxUses: 3,
    judgedEvent: true,
    points: [-1, 1],
    icon: 'stack',
    messages: [
      {
        message: 'Whelp, that didnt go great',
        showOnlyIfPointsMatch: -1
      }
    ]
  }

  hardcodedStunt12: Stunt = {
    name: 'Yoga',
    rules: 'Just make it through Craig\'s yoga class and you get 1pt.  Craig you will get pts based on your instruction',
    maxUses: 1,
    points: [1, 3],
    icon: 'yoga',
    judgedEvent: true,
    messages: [
      {
        message: 'Highway robbery, I would file an appeal',
        showOnlyIfPointsMatch: 2
      },
      {
        message: 'Nice man, you could probably open your own Yoga studio',
        showOnlyIfPointsMatch: 3
      },
    ]
  }

  hardcodedStunt13: Stunt = {
    name: 'Hide an Ice',
    rules: 'The rules are on your card.  IMPORTANT: points for this are hidden until the end of the weekend, and submissions wont appear in the spectator view either (to aid you in your secret mission).   Also only you can see this stunt, so dont share your screen!',
    maxUses: 3,
    points: [1],
    icon: 'ice',
    secretRoleStunt: true,
    messages: [
      {
        message: 'Alright Everyone! Chill',
        showOnlyIfSubmissionNumber: 1
      },
      {
        message: 'Let\'s Kick Some Ice',
        showOnlyIfSubmissionNumber: 2
      },
      {
        message: 'What Killed The Dinosaurs? The Ice Age',
        showOnlyIfSubmissionNumber: 3
      }
    ]
  }

  hardcodedStunt14: Stunt = {
    name: 'Pickle',
    rules: 'The rules are on your card.  IMPORTANT: points for this are hidden until the end of the weekend, and submissions wont appear in the spectator view either (to aid you in your secret mission).   Also only you can see this stunt, so dont share your screen!',
    maxUses: 3,
    points: [1],
    icon: 'pickle',
    secretRoleStunt: true,
    messages: [
      {
        message: 'Quite the pickle youve gotten us into',
        showOnlyIfSubmissionNumber: 1
      }
    ]
  }

  hardcodedStunt15: Stunt = {
    name: 'Do Your Damn Job',
    rules: 'If you arent havent already gotten points for your role mark 2pts.  If you got busted cheating... well ask Tyler',
    maxUses: 1,
    points: [-5,2],
    icon: 'job',
    secretRoleStunt: true,
    judgedEvent: true,
    messages: [
      {
        message: 'Get rekt nub',
        showOnlyIfPointsMatch: -5
      }
    ]
  }

  hardcodedUsers = [this.hardcodedUser1, this.hardcodedUser2, this.hardcodedUser3, this.hardcodedUser4, this.hardcodedUser5, this.hardcodedUser6, this.hardcodedUser7, this.hardcodedUser8, this.hardcodedUser9, this.hardcodedUser10, this.hardcodedUser11];

  hardcodedStunts = [this.hardcodedStunt1, this.hardcodedStunt2, this.hardcodedStunt3, this.hardcodedStunt4, this.hardcodedStunt5, this.hardcodedStunt6, this.hardcodedStunt8, this.hardcodedStunt9, this.hardcodedStunt10, this.hardcodedStunt11, this.hardcodedStunt12, this.hardcodedStunt13, this.hardcodedStunt14, this.hardcodedStunt15];


}


