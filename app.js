const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  //here if i want to send the weather data then i should somehow make a get request to the weather server and then parse the response and
  // then send it as a response to the clients browser.
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  const cityName = req.body.cityName;
  const apiKey = "fbba59aee07ef36e1d879a4f1003c45d";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+apiKey+"&units=" + units;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      //from the response only the data is filtered out.
      //console.log(data);
      //but as we see when printed the data is in the hexa decimal form
      // so need to convert it to JSON
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      //now the weather data becomes a javascript object.
      // this weatherData can again be converted to string format by
      // the command JSON.stringify(weatherData);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      //now you need to send res to the client browser....but if you
      //want to send both temp and desc.
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>temp is " + temperature + "</h1>");
      res.write("<p>Weather description : " + weatherDescription + "</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
