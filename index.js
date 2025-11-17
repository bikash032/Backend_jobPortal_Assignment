// http create server 
// protocol, http
const http = require('http');
const app = require("./src/config/express.config");

// request => Response Cycle

const httpServer = http.createServer(app);     // node server, either () => {}, server application

const PORT = 9000


// domain, port => host 
// port => number 0 - 2^16 -1
// http-> 80, https => 443, smtp -> 25, ftp -> 21, sftp-> 22, ssh , IMAP,POP3 => 25,2525, 587,465
httpServer.listen(PORT, 'localhost', (err) => {
// app.listen(PORT, 'localhost', (err) => {
  if(!err) {
    console.log("Server is running on port: ", PORT)
    console.log("Press CTRL+C to disconnect your server...")
  }
})