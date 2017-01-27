// content of index.js
var restify = require('restify');
// var feeder = require('feeder.js');
var server = restify.createServer();
// server.use(restify.bodyParser());
server.use(restify.queryParser());

var d = new Date();
var curStation = d.getMinutes();

var trainArrivalData = [];

// const http = require('http');
const port = 3000;

function getMessages(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  console.log(req.params.name);

  var jsonData = JSON.stringify(getStationInfo(req.params.name));

  res.json(200, jsonData);
}

function random(low, high) {
  return Math.round(Math.random() * (high - low) + low);
}

function getRandomTrainArrivalData(type) {
  var minutes = d.getMinutes();

  if(minutes % 2 == 0 || type == 0) {
      var randArrival = random(0, 21);
      trainArrivalData.push()
      return random(0, 21);
  } else {
    return trainArrivalData;
  }
}

function getStationInfo(stationName, type){
  if (stationName == "Ballerup") {
    return [createTrain("Klampenborg", "C", getRandomTrainArrivalData(type), generateCarts(), 2),
    createTrain("Frederikssund", "C", getRandomTrainArrivalData(type), generateCarts(), 1)];
  }
  else if (stationName == "Flintholm") {
    return [createTrain("Hellerup", "F", getRandomTrainArrivalData(type), generateCarts(), 2),
    createTrain("Ny Ellebjerg", "F", getRandomTrainArrivalData(type), generateCarts(), 1)];
  }
  else if (stationName == "Jersie") {
    return [createTrain("Køge", "E", getRandomTrainArrivalData(type), generateCarts(), 2),
    createTrain("Hillerød", "E", getRandomTrainArrivalData(type), generateCarts(), 1)];
  }
  else if (stationName == "Ølstykke") {
    return [createTrain("Frederikssund", "C", getRandomTrainArrivalData(type), generateCarts(), 2),
    createTrain("Klampenborg", "C", getRandomTrainArrivalData(type), generateCarts(), 1)];
  }
  else if (stationName == "London") {
    return [createTrain("Hogsmeade", "Q", getRandomTrainArrivalData(type), generateCarts(), 9.75),
    createTrain("Ny Klampenborg", "Q", getRandomTrainArrivalData(type), generateCarts(), 9.75)];
  }
  else {
    return createTrain("Unknown", "Z", 0, [0,0,0], 0);
  }
}

//4,8,12,16
const averageWeightPerPerson = 74.4;
const maxAllowPersonsPerCar = 87.5;

function generateCarts() {
  var numOfCarts = random(1, 4) * 4;
  var result = "[";

  for(i = 0; i < numOfCarts; i++){
    var randomWeight = random(0, 8000);
    result += Math.round(randomWeight / maxAllowPersonsPerCar)
    if(i+1 < numOfCarts)
      result += ",";
  }

  return result + "]";
}

function createTrain(inDestination, inLine, inEta, inCarts, inPlatform) {
  return {
    destination: inDestination,
    line: inLine,
    eta: inEta,
    carts: inCarts,
    platform: inPlatform
  };
}

// function postMessages(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//
//   res.send("POST test");
// }

server.get('/getStationInfo', getMessages);
// server.post('/messages', postMessages);

// var requestHandler = (request, response) => {
//   console.log(request.url);
//   response.contentType = 'json';
//
//   var data = [
//     {data1: 'hello', data2: 'world2'}
//   ];
//
//   console.log(JSON.stringify(data));
//
//   response.send(200, "test");
//
//   // response.end('Hello Node.js Server!')
// }

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
