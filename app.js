const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
   res.sendFile(__dirname +"/index.html");
    
});
app.post("/", function(req,res){

    const countryName = req.body.countryName;
    const url = "https://restcountries.eu/rest/v2/name/"+countryName+"?fullText=true";
    https.get(url, function(response){

        console.log(response.statusCode);
        var data;

        response.on("data",function(chunk){
            if(!data){
                data = chunk;
            } else {
                data += chunk;
            }
        });

        response.on("end", function(){
            const countryData = JSON.parse(data);
            const imageURL = countryData[0].flag;
                        res.write("<h2>  "+countryName+"'s Flag is:</h2>");
            res.write("<img src="+imageURL+" height=200px; width=400px;>");
            res.send();
        })
     
    })
  
})






app.listen(3000, function(){
    console.log("Server is running on port 3000");
});