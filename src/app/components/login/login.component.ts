import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder, 
    private _userService: UserService, 
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._userService.getToken(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
    )
    .subscribe(data => {
      this._userService.setUser(this.loginForm.value.email);
      this._authService.login(data.token);
    }, error => {
      console.log(error);
    });
  }

  get f() { return this.loginForm.controls; }

}
