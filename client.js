var socket = io();

var data = {};

socket.on('connect', () => {
	socket.emit('fetchData', (value) => {
		data = value;
		if(data.j==1) {
			document.body.style.backgroundColor = "green";
		} else {
			document.body.style.backgroundColor = "red";
		}
	});
})

function verify() {
	socket.emit('verify', data.publicKey, data.value, data.proof, (value) => {
		console.log(value);
	})
}