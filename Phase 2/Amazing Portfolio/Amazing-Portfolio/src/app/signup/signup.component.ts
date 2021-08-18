import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output()
  changeView = new EventEmitter;

  signUpForm = new FormGroup({
    fname:new FormControl("", [Validators.required]),
    lname:new FormControl("", [Validators.required]),
    uname:new FormControl("", [Validators.required]),
    pword:new FormControl("", [Validators.required])
  });

  constructor(public uService:UserService) { }

  ngOnInit(): void {
  }

  //attempt to create an account
  createAccount():void {
    let sign = this.signUpForm.value;
    if (this.uService.addUser(sign.uname, sign.pword, sign.fname, sign.lname))
    {
      //if returned true, user was added. Change view to login page
      alert("Account successfully created");
      this.changeView.emit("login");
    }
    else
    {
      //if returned false, username already exists
      alert("Could not create account: Username already in use")
    }
  }
}
