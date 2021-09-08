//load the required modules
const { response } = require('express');
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//create reference for express
let app = express();
app.use(bodyParser.urlencoded({extended:true}))
let url = "mongodb://localhost:27017/courses"

mongoose.pluralize(null);   //stop mongoose from pluralizing collection name

//connect mongoose to the database, must be started first
mongoose.connect(url).then(res=>console.log("Connected to the database..")).catch(err=>console.log(err));
//define schema to use in mongoDB
let courseSchema = mongoose.Schema({
    _id:Number,
    name:String,
    description:String,
    amount:Number
})
//create model using schema
let courseModel = mongoose.model("Course", courseSchema)

//define get and post methods
app.get("/", (request, response)=> {
    response.sendFile(__dirname + "/index.html");
})
app.get("/addCourse", (request, response)=> {
    response.sendFile(__dirname + "/add.html");
})
app.get("/deleteCourse", (request, response)=> {
    response.sendFile(__dirname + "/delete.html");
})
app.get("/updateCourse", (request, response)=> {
    response.sendFile(__dirname + "/update.html");
})
app.get("/fetchCourses", (request, response)=> {
    courseModel.find({}, (err, result)=>
    {
        //start writing string and add to it after iterating through all records. Will send with 'response' once complete
        let table = `<table border="1">
            <tr>
                <th>Course Id</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>`
        for (let r of result)
        {
            table += `
            <tr>
                <td>${r._id}</td>
                <td>${r.name}</td>
                <td>${r.description}</td>
                <td>${r.amount}</td>
            </tr>`
        }
        table+="</table><br><a href='/'>Go Back</a>"
        response.send(table);
    });
})

app.post("/addCourse", (request,response)=> {
    console.log("Attempting to add:")
    console.log(request.body)
    let newCourse = {
        _id:request.body.courseId,
        name:request.body.courseName,
        description:request.body.description,
        amount:request.body.amount
    }
    //first check if there is an existing course with the same id
    courseModel.find({_id:newCourse._id}, (err1, result1)=> {
        if (!err1)
        {
            //if there is an existing course with the same id, don't add. Must be unique
            if (result1[0] == undefined)
            {
                courseModel.insertMany(newCourse, (err, result)=> {
                    if (!err) {
                        response.send("Successfully added course<br><a href='/'>Go Back</a>");
                    }
                    else {
                        response.send(err + "<br><a href='/'>Go Back</a>");
                    }
                })
            }
            else
            {
                response.send("Could not add. Course ID must be unique<br><a href='/'>Go Back</a>");
            }
        }
        else
        {
            response.send(err1 + "<br><a href='/'>Go Back</a>");
        }
    })
})
app.post("/deleteCourse", (request, response)=> {
    console.log("Attempting to delete courseId: " + request.body.courseId)
    courseModel.deleteOne({_id:request.body.courseId}, (err, result) => {
        if (!err) {
            if (result.deletedCount > 0)
            {
                console.log(1);
                response.send("Successfully deleted the course<br><a href='/'>Go Back</a>");
            }
            else {
                console.log(2);
                response.send("No such course found<br><a href='/'>Go Back</a>")
            }
        }
        else {
            response.send(err + "<br><a href='/'>Go Back</a>");
        }
    })
})
app.post("/updateCourse", (request, response)=> {
    console.log("Attempting to update courseId: " + request.body.courseId);
    courseModel.updateOne({_id:request.body.courseId},{$set:{amount:request.body.amount}}, (err, result)=> {
        if (!err) {
            if (result.matchedCount > 0)
            {
                if (result.modifiedCount == 0) {
                    response.send("Could not modify the course. That is already it's amount<br><a href='/'>Go Back</a>")
                }
                else {
                    response.send("Successfully updated the course amount<br><a href='/'>Go Back</a>")
                }
            }
            else {
                response.send("No course found with that ID<br><a href='/'>Go Back</a>")
            }
        }
        else {
            response.send(err + "<br><a href='/'>Go Back</a>");
        }
    })
})

app.listen(9090, ()=>console.log("Server running on port 9090"))