//load modules
let fs = require('fs');
let http = require('http');
let url = require('url')

//load html page content
let planner = fs.readFileSync("planner.html")

let tasks = []; //array will hold added tasks

let server = http.createServer((request, response)=> {
    let urlParse = url.parse(request.url, true);
    //don't do anything for favicon request, so server terminal output is cleaner (for debugging)
    if (urlParse.path != "/favicon.ico")
    {
        //so html code sent is read properly, write content type in head
        response.writeHead(200, {"content-type":"text/html"})
        console.log(urlParse);
        //what html page we load depends on pathname
        if (urlParse.pathname=="/addTask")
        {
            //add sent task data to tasks array
            //check that task id doesn't already exist
            let find = tasks.find(t => t.taskId == urlParse.query.taskId)
            if (find == undefined)
            {
                //validate userID and taskID: Must be numbers
                if (isNaN(urlParse.query.taskId) || isNaN(urlParse.query.taskId))
                {
                    response.write("<h2>Cannot add task - Employee ID and Task ID must be numbers</h2>")
                }
                else
                {
                    //id doesn't already exist. Add task
                    //update task array from tasks.json, then append and overwrite json file
                    tasks = JSON.parse(fs.readFileSync("tasks.json"));
                    tasks.push(urlParse.query);
                    let updatedTasks = JSON.stringify(tasks);
                    fs.writeFileSync("tasks.json", updatedTasks);
                    response.write("<h2>Task " + urlParse.query.taskId + " successfully added</h2>");
                }
            }
            else
            {
                //id already exists
                response.write("<h2>Cannot add task - Task with same ID already exists</h2>")
            }
            
            response.write("<br><a href='/'>Go Back</a>")
        }
        else if (urlParse.pathname=="/listTasks")
        {
            //update tasks from json
            tasks = JSON.parse(fs.readFileSync("tasks.json"));
            //create table of tasks
            response.write(
                `<table border="1">
                <tr>
                    <th>Employee ID</th>
                    <th>Task ID</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </tr>`)
            for (let task of tasks)
            {
                response.write(
                    `<tr>
                        <td>${task.empId}</td>
                        <td>${task.taskId}</td>
                        <td>${task.task}</td>
                        <td>${task.deadline}</td>
                    </tr>`)
            }
            response.write("</table><br><a href='/'>Go Back</a>")
        }
        else if (urlParse.pathname =="/deleteTask")
        {
            //update tasks from json
            tasks = JSON.parse(fs.readFileSync("tasks.json"));
            //check that task id has been stored
            let find = tasks.findIndex(t=>t.taskId == urlParse.query.taskId);
            console.log("index is :" + find);
            if (find == -1)
            {
                response.write("<h2>Could not delete task - No task with this ID</h2>");
            }
            else
            {
                tasks.splice(find, 1);
                //update json
                let updatedTasks = JSON.stringify(tasks);
                fs.writeFileSync("tasks.json",updatedTasks);
                response.write("<h2>Task Successfully deleted</h2>");
            }
            response.write("</table><br><a href='/'>Go Back</a>");
        }
        else
        {
            response.write(planner);
        }
    }
    response.end();
})

server.listen(9090, ()=>console.log("Server is running on port number 9090"))