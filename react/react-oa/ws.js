const server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server });


// var v4 = require('node-uuid').v4;
import { v4 } from 'node-uuid';
// var clients = [];
const clients = new Map();
wss.on('connection', ws => {
    console.log('one client connected, count:', wss.clients.length);
    ws.on('message', msg => {
        try {
            msg = JSON.parse(msg);
        } catch (error) {
            console.log('transform error:', error);
        }
        console.log('msg:', msg);
        if (msg.uid) {
            var id = msg.uid;
            clients.set(id, ws);
            clients.get(id).send('ok')
        } else {
            let { from, to} = msg;
            if (clients.has(to)) {
                clients.get(to).send(JSON.stringify(msg));
            }
        }
    });
    ws.on('close', () => {
        console.log('one client has closed,count:', wss.clients.length);
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].ws == ws) {
                clients.splice(i, 1);
            }
        }
    })
});
wss.broadcast = data => {
    wss.clients.forEach(client => {
        client.send(data);
    })
}

module.exports = server;