var v4 = require('node-uuid').v4;
var WebSocket = require('ws').Server;

var wss = new WebSocket({ port: 3000 });
var clients = [];
wss.on('connection', ws => {
    console.log('client connected');
    console.log(wss.clients.length);
    var id = v4();
    clients.push({ id, ws });
    ws.on('message', msg => {
        setTimeout(() => {
            console.log('time out');
            clients[0].ws.send('from ws');
        }, 1000);
        console.log(msg);
    });
    ws.on('close', () => {
        console.log('one client has closed');
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].ws == ws) {
                clients.splice(i, 1);
            }
        }
        console.log(clients.length);
    })
    if (clients.length > 0) {
        wss.broadcast('broadcast');
        // clients[0].ws.send('from id');
    }
});
wss.broadcast = data => {
    wss.clients.forEach(client => {
        client.send(data);
    })
}

