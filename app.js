const express=require("express");

const bodyParser=require("body-parser");

const request=require("request");

const https=require("https");


var app=express();
//statoc function is use to use the css used in the html
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

   res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

        const firstName=req.body.fname;
        const lastName=req.body.lname;
        const email=req.body.email;

        const data={

          members: [{

              email_address:email,
              status: "subscribed",
              merge_fields:{
                  FNAME:firstName,
                  LNAME:lastName

              }

          }]

        };

        const jsonData=JSON.stringify(data);

        const url="https://us1.api.mailchimp.com/3.0/lists/a172824244"

        const options={
            method: "POST",
            auth: "satyam:<Add API key>"
        };
      const request=  https.request(url,options, function(response){

            if(response.statusCode===200){

              res.sendFile(__dirname+"/sucess.html");

            }
            else{

                res.sendFile(__dirname+"/failure.html");

            }
            response.on("data",function(data){

              console.log(JSON.parse(data));
            })
        })
        //to write to the mail chimp server
        request.write(jsonData);

        request.end();

});

app.post("/failure",function(req,res){

  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){

  console.log("server is up");
});

