//declare dependencies
let express = require('express');
let bodyParser = require('body-parser')
let fs = require('fs');

let app=express();
app.use(bodyParser.urlencoded({extended:true}))

//html code to send
let htmlPage = 
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script>
        function listTasks() 
        {
            console.log("Called listTasks")
        }
        </script>
        <style>
            pre{
                display:inline;
                margin:0;
            }
        </style>
    </head>
    <body>
        <h1>Task Planner</h1>
        <hr>
        <h2>Add Task</h2>
        <form action="addTask" method="POST">
            <label>Emp ID:</label><pre>&#9</pre>
            <input type="text" name="empId" required><br>
            <label>Task ID:</label><pre>&#9</pre>
            <input type="text" name="taskId" required><br>
            <label>Task: </label><pre>&#9&#9</pre>
            <input type="text" name="task" required><br>
            <label>Deadline: </label><pre>&#9</pre>
            <input type="date" name="deadline" required><br>
            <input type="submit" value="Add Task">
            <input type="reset" value="Reset Form">
        </form>
        <hr>
        <h2>Delete Task</h2>
        <form action="deleteTask" method="GET">
            <label>Task ID:</label>
            <input type="text" name="taskId">
            <input type="submit" value="Delete Task">
        </form>
        <hr>
        <h2>List Tasks</h2>
        <button onclick="listTasks()">List All Tasks</button>
    </body>
    </html>
    `

let tasks = [];

app.get("/", (request, response)=> {
    response.send(htmlPage)
})

app.post("/addTask", (request, response)=>{
    let info = request.body;
    //**TODO: Confirm that ids are numbers
    console.log(info);
    //store new task
    tasks.push(info);
})



app.listen(9090, ()=>console.log("Server is running on port 9090"))

