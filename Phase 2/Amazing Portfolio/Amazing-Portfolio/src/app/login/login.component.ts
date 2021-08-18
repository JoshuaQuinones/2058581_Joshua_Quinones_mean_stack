import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginMessage:string = "";
  loginForm = new FormGroup({
    uname:new FormControl("", Validators.required),
    pword:new FormControl("", Validators.required),
  })

  constructor(public uService:UserService) { }

  ngOnInit(): void {
  }

  @Output()
  changeView = new EventEmitter;

  //use event emitter to send target component to parent app.component
  sendViewChange(target:string):void 
  {
    this.changeView.emit(target);
  }

  //attempt to login using provided username and password
  attemptLogin():void {
    let login = this.loginForm.value;
    if(this.uService.findUser(login.uname, login.pword))
    {
      //user found, proceed to portfolio page
      this.changeView.emit("portfolio");
    }
    else
    {
      //user not found. Stay on login page 
      this.loginMessage = "Login failed: username or password is incorrect"
    }
  }
}
