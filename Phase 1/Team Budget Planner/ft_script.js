//iterate through objects in sessionStorage array and display in a table
function display() 
{
    projArr = sessionStorage.getItem("array");
    if (projArr == null) //array does not exist
    {
        alert("Could not display table as there are no projects");
		document.getElementById("contents").innerHTML = "<p class='centered'>Nothing to display</p>";
        return
    }
    else //array will be in string format. Parse to store as array
    {
        projArr = JSON.parse(projArr);
    }
    //will write html code in a string to display the table
    let contentsString = "";
    let current = null;
    let tableStart = "<table class='table table-striped'><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>"
    let tableEnd = "</table>"
    let totalBudget = 0 //keep track of total budget from all entries
    //iterate through objects and add code to display them to string
    for (let i = 0; i < projArr.length; i++)
    {
        current = projArr[i]; //get next project object
        current = JSON.parse(current); //will be in string format. Parse to get object
        contentsString += "<tr><td>" + current.client + "</td><td>" + current.project +
            "</td><td>$" + current.budg + "</td></tr>";
        totalBudget += current.budg;
    }
    let postTable = "<p>Total budget is <b>$" + totalBudget + "</b></p>"
    //add contentsString to html page
    document.getElementById("contents").innerHTML = tableStart + contentsString + tableEnd + postTable;
}