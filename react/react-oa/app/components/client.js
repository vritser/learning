var ws = new WebSocket("ws://localhost:3000");
ws.onopen = function (e) {
    console.log('Connection to server opened');
    // ws.send(JSON.stringify({ from: '1',  content: 'hhhh' }));
}

export default ws;