import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  @Output() 
  loginEvent = new EventEmitter<string>();

  onSubmit(): void {
    const credsString = this.loginForm.get('username')!.value + '~' + this.loginForm.get('password')!.value;
    this.loginEvent.emit(credsString);
  }

  isDisabled(): boolean {
    return this.loginForm.get('username')?.value === '' || this.loginForm.get('password')?.value === '' ? true : false;
  }


}
