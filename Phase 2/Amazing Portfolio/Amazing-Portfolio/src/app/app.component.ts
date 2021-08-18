import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { Portfolio } from './user-data';
import { UserService } from './user.service';

//Considered using a separate component for portfolio, but the only way I could think of to update
// data stored there would have been to also store the data here in order to pass it during updateView()
// call using @input. To me, it made more sense to display portfolio page using app.component.html since
// it will be storing that data anyways.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  portMessage:string = "";

  constructor(public uService: UserService) {} //DI UserService

  //FormGroup for adding portfolios to a user
  portForm = new FormGroup({
    name:new FormControl("", Validators.required),
    num: new FormControl("", Validators.required)
  })
  title:string="Amazing-Portfolio";

  login:boolean = true;
  signup:boolean = false;
  portfolio:boolean = false;
  
  //store data about current user that will be displayed when portfolio page is selected
  userFName:string = "";
  userLName:string = "";
  userPortfolios:Array<Portfolio> = [];

  //function for child components to call when they want to change the current component view
  //1 will display the login form, 2 will display the 
  updateView(comp:string):void {
    if (comp == "login")
    {
      this.login=true;
      this.signup=false;
      this.portfolio=false;
    }
    else if (comp == "signup")
    {
      this.login=false;
      this.signup=true;
      this.portfolio=false;
    }
    else if (comp == "portfolio")
    {
      //update data to display in portfolio div tag of app.component.html
      this.userFName = this.uService.userList[this.uService.currentUserIndex].firstname;
      this.userLName = this.uService.userList[this.uService.currentUserIndex].lastname;
      this.userPortfolios = this.uService.userList[this.uService.currentUserIndex].contacts;
      this.login=false;
      this.signup=false;
      this.portfolio=true;
      console.log(this.userFName);
      console.log(this.userLName);
      console.log(this.userPortfolios);
    }
  }

  //call addPortfolio with inputted form data
  addPort(): void {
    let add = this.portForm.value;
    console.log(add);
    //check that number is valid before adding
    //+ before add.num is operator to parse number
    let tryNum = +add.num;
    console.log("TRYNUM IS " + tryNum)
    if (Number.isNaN(tryNum))
    {
      this.portMessage = "Invalid input: Phone number must be a number value";
      return;
    }
    else
    {
      this.portMessage = "";
    }
    this.uService.addPortfolio(add.name, add.num);
    //update copy of current user's portfolio being held
    this.userPortfolios = this.uService.userList[this.uService.currentUserIndex].contacts;
    console.log(this.userPortfolios)
    this.portForm.reset();
  }
}
