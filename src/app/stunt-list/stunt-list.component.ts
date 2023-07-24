import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stunt } from '../models/models';
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
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/check-box.svg")
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

  isChecked(stunt: Stunt, index: number): boolean {
    return (index + 1) < stunt.completions!
  }

}
