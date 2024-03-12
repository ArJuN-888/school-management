const { Server } = require("socket.io");

const io = new Server({ cors:"http://localhost:5173" });
let onlineUsers = []
io.on("connection", (socket) => {

 console.log("new connection",socket.id)
 //listen to a connection 
 socket.on("addNewUser",(userID)=>{
if(userID)
{
        !onlineUsers.some(user => user.userID === userID) && 
        onlineUsers.push({
            userID,
            socketId: socket.id
        })
   
    }
    console.log("onlineUsers",onlineUsers)
    io.emit("getOnlineUsers",onlineUsers)
 });
 //add message
 socket.on("sendMessage",(message)=>{
  const user = onlineUsers.find(user=> user.userID=== message.recipientId)
  if(user)
  {
    io.to(user.socketId).emit("getMessage",message)
  }
 })
socket.on("disconnect",()=>{
    onlineUsers = onlineUsers.filter((user)=>user.socketId !== socket.id)
    io.emit("getOnlineUsers",onlineUsers)
})
});


io.listen(8080);