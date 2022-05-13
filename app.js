const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){

   res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res){

  const query = req.body.cityname;
  const appid = "4f70a22bc0db0c6f020e49746799acf4";
  // const unit = "metric"

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + appid +"&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      // console.log(weatherData);
      const temp = weatherData.main.temp
      //main.temp (location of object)
      // console.log(temp);

      const wetherdesc = weatherData.weather[0].description
      // console.log(wetherdesc);

      // const location = weatherData.name
      const icon = weatherData.weather[0].icon
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The Weather in " + query + " is " + wetherdesc + ".</p>")
      res.write("<h1> The Temperature is around " + temp + " degree celsius.</h1>")
      res.write("<img src=" + imageurl +">");
      res.send()
    })
  })

})



app.listen(3000, function (){
  console.log("Server is running on port 3000.");
})
