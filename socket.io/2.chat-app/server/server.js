const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {setMessage, setLocationMessage } = require('./utils/message');
const app = express();

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {

    console.log(`New User connected at ${new Date().toLocaleTimeString()}`);

    // emitting welcome msg when a user joins
    socket.emit('welcomeMsg', setMessage("Admin", "Welcome to the chat App.." ));

    // notifying others when a new user joins 
    socket.broadcast.emit('newUser', `New user joined at ${new Date().toLocaleTimeString()}`);
    
    socket.on('disconnect', ()=> {
        console.log(`User was disconnected at ${new Date().toLocaleTimeString()}`);
    });

    socket.on('createMessage', (msg, acknowledge)=> {
        console.log("Msg => ", msg);
    
    // 'io.emit' automatically  emits to all the active connection including sender also       
    // io.emit('newMessage', setMessage(msg.from, msg.message));
    
    // 'socket.broadcast.emit' emits to all the active connection except the sender i.e all the connected user will gets the data except sender      
    socket.broadcast.emit('newMessage', setMessage(msg.from, msg.message));

    acknowledge({
        isValid: true,
        at: new Date().toLocaleTimeString()
    }); // optional : notifies user when client has received the data. mostly used to tell client that data was valid or not
    
    });

        // Sharing Location to others
    socket.on('locationMessage', (coords) => {
        socket.broadcast.emit( 'createLocationMessage', setLocationMessage('Admin',coords.latitude,coords.longitude) );
    });

});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening at port ${port}...`);
});
