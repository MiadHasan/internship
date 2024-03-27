const http = require('http')
const getData = require('./readData')

//creating server
const server = http.createServer((req, res) => {
  getData(res)
})

server.listen(3000)

console.log('listening to port 3000')