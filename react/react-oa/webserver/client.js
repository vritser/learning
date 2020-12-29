var Client = require('ws').WebSocket;

var ws = new Client('ws://localhost:8000');
ws.onopen = e => {
    console.log('connection to server opened');
}
ws.send('hello')