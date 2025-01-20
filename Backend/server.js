const http = require("http");
const app = require("./app");
const Port = process.env.PORT || 3000;
const {initializeSocket} = require("./socket");

const server = http.createServer(app);

initializeSocket(server);

server.listen(Port,()=>{
  console.log(`Server is running on port ${Port}`);
});