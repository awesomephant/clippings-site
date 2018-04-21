const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const { spawn } = require('child_process');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('clipping request', function () {
        console.log('Clipping requested')
        let pythonProcess = spawn('python', ["sample.py"]);
        pythonProcess.stdout.on('data', (data) => {
            io.emit('result', data.toString())
        });
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});