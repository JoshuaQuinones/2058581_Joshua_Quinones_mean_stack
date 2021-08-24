let fs = require("fs"); //for reading from json file
let readline = require("readline") //for reading from keyboard input

//function to take user input from console and append it to array of records in records.json
function logRecord() {
    //define records here, will assign value after attempting to read from file
    //note to self: previously attempted to define within try/catch blocks, but 
    // that would mean they were defined in that scope and couldn't be read 
    //outside of the blocks
    let records = null;

    //would be easier to use readline-sync, but using asynchronous readline here
    // for practice

    //first, read the json file. 
    //Do synchronously so it is read before user input is taken
    try
    {
        //parse array of records from json string
        debugger;
        records = JSON.parse(fs.readFileSync("records.json").toString());
        console.log("Successfully read records.json");
        debugger; //see if made it here
    }
    catch(err)
    {
        console.log(err);
        console.log("No records.json file exists, or it contains errors. Will create one/overwrite existing");
        //no records.json file. Create empty array for now. Will create json later
        records = [];
        debugger; //see if made it here
    }
    console.log(records);
    debugger;
    //get user input from console for next error to log
    //ASSUMPTION: Program is for logging details about errors, and should
    // ask for details about those errors
    var rl = readline.createInterface({input:process.stdin, output:process.stdout})
    rl.question("Enter your first name:\n", (fname)=>{
        rl.question("Enter your last name:\n", (lname)=>{
            rl.question("Enter your gender:\n", (gender)=>{
                rl.question("Enter details about the error:\n", (errorDs)=> {
                    //now have all neccessary details. Print to console and append to records
                    console.log("\nERROR LOG")
                    console.log("fname: " + fname);
                    console.log("lname: " + lname);
                    console.log("gender: " + gender);
                    console.log("Error details: " + errorDs);
                    debugger;
                    //get current date and time
                    let time = new Date;
                    let currentDate = time.getDate() + "/" +  (time.getMonth() + 1) + "/" + time.getFullYear();
                    let currentTime = time.getHours() + ":" + time.getMinutes();
                    console.log("\nCurrent date and time:")
                    console.log(currentDate);
                    console.log(currentTime);
                    debugger;
                    //create new error log object
                    let errLog = { fname: fname, lname: lname, gender: gender, errorDetails: errorDs,
                    date:currentDate, time:currentTime}
                    //append new error log object to array of errors and write to json
                    records.push(errLog);
                    let recordString = JSON.stringify(records);
                    fs.writeFileSync("records.json", recordString);
                    //done with readline, close
                    console.log("Successfully wrote new error log to records.")
                    rl.close();
                })
            })
        })
    })
}

logRecord();