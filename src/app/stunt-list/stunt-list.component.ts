import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stunt, User } from '../models/models';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-stunt-list',
  templateUrl: './stunt-list.component.html',
  styleUrls: ['./stunt-list.component.css']
})
export class StuntListComponent implements OnInit {
  @Input()
  stunts: Stunt[] = [];

  @Input()
  activeUser: User = new User();

  @Output() 
  stuntEvent = new EventEmitter<Stunt>();


  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setIcons();
  }

  setIcons(): void {
    this.stunts.forEach(stunt => {
      this.matIconRegistry.addSvgIcon(
        stunt.icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/" + stunt.icon + ".svg")
      );
    });

    this.matIconRegistry.addSvgIcon(
      'checkbox',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/checkbox.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'unchecked',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/blank-check-box.svg")
    );
  }

  counter(i: number) {
    return new Array(i);
  }

  openCard(stunt: Stunt) {
    this.stuntEvent.emit(stunt);
  }

  isChecked(stunt: Stunt, index: number): number {
    let maxSlots = 0;
    
    switch (stunt.maxUses) {
      case 1: maxSlots = 6; break;
      case 2: maxSlots = 5; break;
      case 3: maxSlots = 4; break;
      case 4: maxSlots = 3; break;
      case 5: maxSlots = 2; break;
      default: maxSlots = 1;
    }

    if((index + 1) < (maxSlots)) {
      return 2;
    } else if (stunt.completions!.size !== 0 && ((index + 1) - (6 - stunt.maxUses) <= stunt.completions!.size)) {
      return 1;
    }
    return 0;
  }

  showStunt(stunt: Stunt): boolean {
    
    if(stunt.secretRoleStunt) {
      let ret = false;

      if(this.activeUser.secretRoles !== undefined) {
        this.activeUser.secretRoles.forEach(stuntName => {
          if(stuntName === stunt.name) {
            ret = true;
          }
        });
      }
      
      return ret;
    }

    return true;
  }

}
