import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder, 
    private _userService: UserService, 
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
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
    if (this.registerForm.invalid) {
      return;
    }
    this._userService.registerUser({ 
      email: this.registerForm.value.email, 
      password: this.registerForm.value.password
    }).subscribe(() => {
      this._router.navigate(['/tareas']);
    });

  }

  get f() { return this.registerForm.controls; }

  goBack(): void {
    this._location.back();
  }

}