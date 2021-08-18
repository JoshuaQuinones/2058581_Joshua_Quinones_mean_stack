//interface with a user's login credentials and their portfolio data
export interface UserData {
    username:string;
    password:string;
    firstname:string;
    lastname:string;
    contacts:Array<Portfolio>;
}
//interface representing one piece of portfolio data
export interface Portfolio {
    contactName:string;
    phoneNumber:number;
}
