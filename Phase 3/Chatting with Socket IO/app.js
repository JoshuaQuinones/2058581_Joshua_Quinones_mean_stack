//load required modules and create reference for express module
let express = require('express');
let app = express();
let http = require('http').Server(app);

//load socket.io module and connect http using IIFE
let io = require('socket.io')(http);

//define server's responses to chatbox. Using a js object for key-value pairs, where the key is the user's
//input
let responses = {
    "hi": "Hello!",
    "hello": "Hi!",
    "how are you":"I am doing well, thank you for asking.",
    "how are you?":"I am doing well, thank you for asking.",
    "i need help":"I am here to help you with whatever issues you may have. Ask away.",
    "what are you":"I am a chatbot designed to help with common user queries.",
    "what are you?":"I am a chatbot designed to help with common user queries.",
    "who are you":"I am a chatbot designed to help with common user queries.",
    "who are you?":"I am a chatbot designed to help with common user queries.",
    "how do i do this":"Please consult the technical manual that came with your product.",
    "how do i do this?":"Please consult the technical manual that came with your product.",
    "i need a replacement":"Please email customer support with your address and product number to have a replacement sent",
    "i want a refund":"Please email customer support with your receipt attached to assess your eligability for a refund",
    "thank you":"You are welcome. I am glad I could help",
    "thanks":"You are welcome. I am glad I could help"
}
//create date object that will be used to send current date and time with messages from the server
let date = new Date();

//on connection to site, send chat app page that user will use to communicate with the server
app.get("/", (req, res)=>
{
    res.sendFile(__dirname + "\\chat.html");    
})

//behavior on connection
io.on("connection", (socket)=> 
{
    console.log("A client has connected");
    //what happens client sends message to server
    socket.on("chat", (msg)=> {
        //display client message and decide response
        //convert message from json string to array of two strings (name, and message)
        let message = JSON.parse(msg);
        console.log(message[0] + ": " + message[1])
        let response = responses[message[1].toLowerCase()];
        if (response == undefined)
        {
            let thit = "i need help";
            response = responses[thit];
        }
        //add current time to beginning of message. Code with getminutes used to add a leading zero if minutes is less than 10 (ex: 12:04)
        response = date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + ": " + response;
        console.log("Server: " + response);
        socket.emit("response", response);
    })
})

http.listen(9090, ()=> {
    console.log("Server is running on port 9090")
})