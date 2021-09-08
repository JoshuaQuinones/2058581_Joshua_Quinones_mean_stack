//load required modules, create reference for express module, and use with http module
let express = require('express');
let app = express();
let http = require('http').Server(app)
let mongoose = require('mongoose');
const { stringify } = require('querystring');
//load socket.io module and connect http using IIFE
let io = require('socket.io')(http);

//set up mongoose
let url = "mongodb://localhost:27017/chatlog"
mongoose.pluralize(null); //prevent mongoose from pluralizing database name
mongoose.connect(url).then(res=>console.log("Connected to the database")).catch(err=>console.log(err)); //connect app.js to mongodb database
//define schema mongoose will use with mongodb database
let chatSchema = mongoose.Schema({
    _id:Number,
    name:String,
    message:String
})
let chatModel = mongoose.model("Chat",chatSchema)

io.on("connect", (socket)=> {
    console.log("Client has connected to server");
    socket.on("chat", (msg)=> {
        //parse name and message from msg
        let msgParse = JSON.parse(msg);
        //get the largest id currently in the "Chat" collection, next id will be that id plus 1
        chatModel.find({}).sort([["_id", -1]]).exec((err, result)=> {
            let id = -1;
            if (!err) 
            {
                if (result.length == 0) //no existing messages
                {
                    id = 1;
                }
                else 
                {
                    //sorted from highest to lowest, so result[0] will have the largest id
                    id = result[0]._id + 1;
                }
            }
            else 
            {
                console.log(err);
                socket.emit("response", "Failed to add message due to aggregate error. Check server terminal for error details");
            }
            //add new message to database
            chatModel.insertMany({_id:id,name:msgParse[0],message:msgParse[1]}, (err1, result1)=> {
                if (!err1)
                {
                    console.log("Inserted: " + result1);
                    socket.emit("response", "Successfully added message No." + id);
                }
                else 
                {
                    console.log(err1);
                    socket.emit("response", "Failed to add message due to insert error. Check server terminal for error details")
                }
            })
        })
    })
})

//set server to send the chat page when browser connects
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/chat.html");
})

http.listen(9090, ()=> console.log("Server is running on port number 9090"));