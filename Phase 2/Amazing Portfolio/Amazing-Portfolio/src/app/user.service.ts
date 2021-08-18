import { Injectable, Input } from '@angular/core';
import { UserData, Portfolio } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList:Array<UserData> = []; //array holding user objects
  currentUserIndex: number = -1; //currently logged in user
  constructor() { }

  //create new user. Return true if successful, return false if user already exists.
  //checking if username and password exist should be handled by the form calling this function.
  addUser(uname:string, pword: string, fname:string, lname:string):boolean {
    //check that username doesn't already exist
    for (let u of this.userList)
    {
      //return false immediately if user found that has existing username
      if (uname == u.username)
      {
        console.log("Existing user found:" + JSON.stringify(u))
        return false;
      }
    }
    //Create new user object and add to userList. New user will have an empty portfolio
    let user:UserData = {username:uname, password:pword, firstname:fname, lastname:lname, contacts:[]};
    this.userList.push(user);
    console.log("new userlist: " + this.userList)
    return true; //successfully added user
  }

  //return true if login is successful and update "currentUser". Return false if login unsuccessful
  findUser(uname:string, pword: string):boolean {
    for (let u = 0; u < this.userList.length; u++) {
      //check if username and password matches
      if (uname == this.userList[u].username && pword == this.userList[u].password)
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
    let newP: Portfolio = {contactName: name, phoneNumber: num};
    this.userList[this.currentUserIndex].contacts.push(newP);
  }
}
