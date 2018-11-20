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

});


const {utils, ecvrf, sortition} = require('vrf.js')
const seed = Buffer.from('sortition')
const role = Buffer.from('test')
const w = utils.N(1)
const W = utils.N(5)
const tau = utils.N(1)


// const [publicKey, privateKey] = utils.generatePair()
// const [value, proof, j] = sortition.sortition(
//   privateKey, publicKey,
//   seed, tau, role, w, W
// )

// if (+j > 0) {
//   // next
// }

for (let i = 0; i < 5; i++) {
  const [publicKey, privateKey] = utils.generatePair()
  const [value, proof, j] = sortition.sortition(privateKey, publicKey, seed, tau, role, w, W);
  	if(j>0) {
	  console.log(`-------------- test ${i} --------------`)
	  console.log(' value:', value.toString('hex'))
	  console.log('     j:', j.toString())
	  console.log('result:', j.gt(0))

	  console.log(sortition.verifySort(publicKey, value, proof, seed, tau, role, w, W));
	}
}