// content of index.js
var restify = require('restify');
var server = restify.createServer();
server.use(restify.queryParser());

var d = new Date();

var firstTimeGeneratingCars;

var trainArrivalData = [];
var trainCarData = [];

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

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

function getRandomTrainArrivalData(trainId) {
 // ask implementation becuase this doesnt work...
 return Math.floor(random(1, 21));

  if (trainId == -1) {
    for(i = 0; i <= 9; i++){
      var randArrival = random(0, 21);
      trainArrivalData.push(randArrival);
    }
  } else {
    console.log(trainArrivalData.length + " " + trainId);
    console.log("returning: " + trainArrivalData[trainArrivalData.length-trainId]);
    return trainArrivalData[trainArrivalData.length-trainId];
  }
}

function getRandomCarData(trainId) {
  var minutes = d.getMinutes();

  if(minutes % 2 == 0 && firstTimeGeneratingCars) {
      var randCars = generateCarts();
      trainCarData = [];
      trainCarData.push(randCars);
      console.log("%2=0: " + randCars);
      firstTimeGeneratingCars = false;
      return randCars;
  } else if (minutes % 2 == 0 && !firstTimeGeneratingCars) {
      console.log("else % 2: " + trainCarData[trainArrivalData.length - trainId]);
      return trainCarData[trainArrivalData.length - trainId];
  } else {
    console.log("else: " + trainCarData[trainArrivalData.length - trainId]);
    firstTimeGeneratingCars = true;
    return trainCarData[trainArrivalData.length - trainId];
  }
}

function getStationInfo(stationName, type){
  if(trainArrivalData.length == 0){
    getRandomTrainArrivalData(-1);
  }
  if (stationName == "Ballerup") {
    return [
      createTrain("Klampenborg", "C", getRandomTrainArrivalData(0), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 2),
      createTrain("Frederikssund", "C", getRandomTrainArrivalData(1), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1)
    ];
  }
  else if (stationName == "Flintholm") {
    return [
      createTrain("Hellerup", "F", getRandomTrainArrivalData(2), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 2),
      createTrain("Ny Ellebjerg", "F", getRandomTrainArrivalData(3), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1),
      createTrain("Ballerup", "C", getRandomTrainArrivalData(3), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1),
      createTrain("Østerport", "H", getRandomTrainArrivalData(3), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1)
    ];
  }
  else if (stationName == "Jersie") {
    return [
      createTrain("Køge", "E", getRandomTrainArrivalData(4), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 2),
      createTrain("Hillerød", "A", getRandomTrainArrivalData(5), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1)
    ];
  }
  else if (stationName == "Ølstykke") {
    return [
      createTrain("Frederikssund", "H", getRandomTrainArrivalData(6), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 2),
      createTrain("Klampenborg", "C", getRandomTrainArrivalData(7), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1)
    ];
  }
  else if (stationName == "Valby") {
    return [
      createTrain("Frederikssund", "C", getRandomTrainArrivalData(6), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 2),
      createTrain("Østerport", "H", getRandomTrainArrivalData(7), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1),
      createTrain("Høje Taastrup", "B", getRandomTrainArrivalData(7), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1),
      createTrain("Farum", "B", getRandomTrainArrivalData(7), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1),
      createTrain("Køge", "E", getRandomTrainArrivalData(7), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1),
      createTrain("Hillerød", "A", getRandomTrainArrivalData(7), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 1)
    ];
  }
  else if (stationName == "London") {
    return [
      createTrain("Hogsmeade", "A", getRandomTrainArrivalData(8), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 9.75),
      createTrain("Ny Klampenborg", "A", getRandomTrainArrivalData(9), [{id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}, {id: "SB" + random(0, 1000), weight: random(0, 100)}], 9.75)
    ];
  }
  else {
    return [createTrain("Unknown", "Z", 0, [0,0,0], 0)];
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
    if(result > 1) result = 1;
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

server.get('/getStationInfo', getMessages);

server.listen(server_port, server_ip_address, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${server_port}`)
})
