const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const socketIO = require("socket.io");

const port =3500 || process.env.PORT; // After aur we use it when we host it online it will self generate port

const users = [{}]

const server =http.createServer(app);

app.use(cors()); // cors are used for inter communication between url

app.get('/',(req,res)=>{
    res.send('Hi');
})

const io =socketIO(server);

io.on('connection',(socket)=>{
    console.log("connect")

    socket.on('send',({user})=>{
        users[socket.id] = user;
        console.log(`${user} has logged In`)
        socket.broadcast.emit('userJoined',{user:'Admin',message:`${users[socket.id]} has joined`});
        socket.emit('welcome',{user:'Admin',message:`Welcome to the Chat,${users[socket.id]} `});
    })

    socket.on('disconnect', () => {
        console.log('user has left');
        socket.broadcast.emit('leave', { user: 'Admin', message: `${users[socket.id]} has Left` });
        delete users[socket.id]; // Remove the user from the users object
    });

    socket.on('message',({message,id})=>{
      io.emit('sendMessage',{user:users[socket.id],message,id})
    })

})


server.listen(port,()=>{
    console.log(`Server iss Listening to http://localhost:${port}`);
});