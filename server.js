var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { origins: '*:*'});

server.listen(80);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	socket.on('fetchData', (cb) => {
		cb(fetchData());
	})

	socket.on('verify', (publicKey, value, proof, cb) => {
		cb(verify(publicKey, value, proof));
	})
});

const {utils, ecvrf, sortition} = require('vrf.js')
const seed = Buffer.from('sortition')
const role = Buffer.from('test')
const w = utils.N(1)
const W = utils.N(100)
const tau = utils.N(10)

function fetchData() {
	const [publicKey, privateKey] = utils.generatePair()
	const [value, proof, j] = sortition.sortition(privateKey, publicKey, seed, tau, role, w, W);

	return {
		publicKey: publicKey,
		privateKey: privateKey,
		seed: seed,
		role: role,
		w: w, 
		W: W,
		tau: tau,
		value: value,
		proof: proof,
		j: j
	}
}

function verify(publicKey, value, proof) {
	return sortition.verifySort(publicKey, value, proof, seed, tau, role, w, W);
}

for (let i = 0; i < 10; i++) {
  const [publicKey, privateKey] = utils.generatePair()
  const [value, proof, j] = sortition.sortition(privateKey, publicKey, seed, tau, role, w, W)
  if(j>0) {
	  console.log(`-------------- test ${i} --------------`)
	  console.log(' value:', value.toString('hex'))
	  console.log('     j:', j.toString())
	  console.log('result:', j.gt(0))
	}
}