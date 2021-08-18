import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData, Portfolio } from '../user-data';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //**********************************ALL PAGES****************************************

  userList:Array<string> = []; //array holding user objects as JSON strings
  currentUserIndex: number = -1; //currently logged in user
  userFName: string = "";
  userLName:string = "";

  //create new user. Return true if successful, return false if user already exists.
  //checking if username and password exist should be handled by the form calling this function.
  addUser(uname:string, pword: string, fname:string, lname:string):boolean {
    //check that username doesn't already exist
    for (let l of this.userList)
    {
      let u = JSON.parse(l);
      //return false immediately if user found that has existing username
      if (uname == u.username)
      {
        console.log("Existing user found:" + JSON.stringify(u))
        return false;
      }
    }
    //Create new user object and add to userList. New user will have an empty portfolio
    let user:UserData = {username:uname, password:pword, firstname:fname, lastname:lname, contacts:[]};
    let userString = JSON.stringify(user);
    console.log("NEW USER " + userString)
    this.userList.push(userString);
    console.log("new userlist: " + this.userList)
    return true; //successfully added user
  }

  //return true if login is successful and update "currentUser". Return false if login unsuccessful
  findUser(uname:string, pword: string):boolean {
    for (let u = 0; u < this.userList.length; u++) {
      let user = JSON.parse(this.userList[u])
      //check if username and password matches
      if (uname == user.username && pword == user.password)
      {
        //if they match, update user and return true
        this.currentUserIndex = u;
        return true;
      }
    }
      //if no user with matching username and password found, return false
      return false;
  }

  //add a portfolio to current user
  addPortfolio(name:string, num:number):void {
    let user = JSON.parse(this.userList[this.currentUserIndex])
    let newP: Portfolio = {contactName: name, phoneNumber: num};
    user.contacts.push(newP);
    this.userList[this.currentUserIndex];
  }

  //**********************************LOGIN PAGE***************************************
  loginTrue:boolean = true;

  loginMessage:string = "";

  //form group for getting login information
  loginForm = new FormGroup({
    uname:new FormControl("", Validators.required),
    pword:new FormControl("", Validators.required)
  })

  //attempt to login using provided username and password
  attemptLogin():void {
    let login = this.loginForm.value;
    if(this.findUser(login.uname.value, login.pword.value))
    {
      //user found, proceed to portfolio page
      //update data to display in portfolio div tag of app.component.html
      this.userFName = JSON.parse(this.userList[this.currentUserIndex]).firstname;
      this.userLName = JSON.parse(this.userList[this.currentUserIndex]).lastname;
      //update page display
      this.loginTrue=false;
      this.signupTrue=false;
      this.portfolioTrue=true;
    }
    else
    {
      //user not found. Stay on login page 
      this.loginMessage = "Login failed: username or password is incorrect"
    }
  }

  //update view to signup page
  goToSignup(): void {
    this.loginTrue=false;
    this.signupTrue=true;
    this.portfolioTrue=false;
  }
  
  //**********************************SIGN UP PAGE*************************************
  signupTrue:boolean = false;
  
  //form group for adding a new user
  signUpForm = new FormGroup({
    fname:new FormControl("", [Validators.required]),
    lname:new FormControl("", [Validators.required]),
    uname:new FormControl("", [Validators.required]),
    pword:new FormControl("", [Validators.required])
  });

  //attempt to create an account
  createAccount():void {
    let sign = this.signUpForm.value;
    console.log("SIGN VALUE" + sign.uname)
    if (this.addUser(sign.uname, sign.pword, sign.fname, sign.lname))
    {
      //if returned true, user was added. Change view to login page
      alert("Account successfully created");
      //update view
      this.loginTrue=true;
      this.signupTrue=false;
      this.portfolioTrue=false;
    }
    else
    {
      //if returned false, username already exists
      alert("Could not create account: Username already in use")
    }
  }  

  //**********************************PORTFOLIO PAGE***********************************
  portfolioTrue:boolean = false;

  //FormGroup for adding portfolios to a user
  portForm = new FormGroup({
    name:new FormControl("", Validators.required),
    num: new FormControl("", Validators.required)
  })

  //call addPortfolio with inputted form data
  addPort(): void {

  }
}
