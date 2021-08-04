//add new element to array of projects that is stored in session storage
function addFun()
{
    //validate userinput
    let clientName = document.getElementById("clientName").value
    let projectName = document.getElementById("projectName").value
    let budget = document.getElementById("budget").value
    if (clientName.length == 0 || projectName.length == 0 || budget.length == 0)
    {
        alert("Could not add project: one or more text fields is empty");
        return;
    }
    budget = parseInt(budget);
    if (isNaN(budget))
    {
        alert("Could not add project: budget input is not a number")
        return;
    }
    //get array from session storage, if it exists
    let projArr = sessionStorage.getItem("array");
    if (projArr == null) //array does not exist. Create new empty array
    {
        projArr = new Array();
    }
    else //array exists, will be in string form
    {
        projArr = JSON.parse(projArr)
    }
    //create object from user inputted data
    let newData = {client:clientName,project:projectName,budg:budget}
    //stringify data before putting in array
    newData = JSON.stringify(newData)
    //add object to front of array
    projArr.push(newData)
    //now need to stringify entire array before storing in local storage
    projArr = JSON.stringify(projArr)
    //update array in session storage
    sessionStorage.setItem("array", projArr)
    //alert user of successful addition
    alert("Successfully added project")
    //for debug
    console.log("log2:" + projArr)
}