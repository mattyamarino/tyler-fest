import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input()
  loginFail = false;

  @Output() 
  loginEvent = new EventEmitter<string>();

  submitting = false;

  onSubmit(): void {
    if(!this.submitting) {
      this.submitting = true;
      const credsString = this.loginForm.get('username')!.value + '~' + this.loginForm.get('password')!.value;
      this.loginEvent.emit(credsString);
      this.submitting = false;
    }
  }

  isDisabled(): boolean {
    return this.loginForm.get('username')?.value === '' || this.loginForm.get('password')?.value === '' ? true : false;
  }


}
