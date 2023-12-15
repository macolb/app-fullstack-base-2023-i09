//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};


var app     = express();
app.use(cors(corsOptions));

var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

//=====================GET Functions============================

app.get("/otraCosa",(req,res,next)=>{
    utils.query("select * from Devices",(err,rsp,fields)=>{
        if(err==null){            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });
    
});

/*
app.get("/otraCosa/:id/:algo",(req,res,next)=>{
    console.log("id",req.params.id)
    console.log("algo",req.params.algo)
    utils.query("select * from Devices where id="+req.params.id,(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });
    
});
*/

app.get("/users",(req,res,next)=>{
    res.send("Listo");
    
});

app.get('/devices/', function(req, res, next) {

    utils.query("select * from Devices",(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });    

});

/*
app.get('/devicetoEditar', function(req, res, next) {

    console.log("Llego el post",
    "SELECT * FROM Devices WHERE id = "+req.body.id);

    console.log(req.body);

    utils.query("SELECT * FROM Devices WHERE id = 3",(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });    
});
*/

app.get("/devicetoEditar/:id",(req,res,next)=>{
    console.log("id",req.params.id)
    //console.log("algo",req.params.algo)
    utils.query("SELECT * FROM Devices WHERE id ="+req.params.id,(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send(JSON.stringify(rsp));
        }else{
            console.log("err",err);
            res.status(409).send(err);
        }
    });
    
});


//=====================POST Functions============================

app.post("/deviceEdit",(req,res,next)=>{
    console.log("Llego el post",
    "UPDATE Devices SET state = "+req.body.state+" WHERE id = "+req.body.id);

    utils.query("UPDATE Devices SET state = "+req.body.state+" WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            //res.status(200).send(JSON.stringify(rsp));
            res.status(200).send("se cambio el estado del dispositivo");
        }else{
            console.log("err",err);
            //res.status(409).send(err);
            res.status(409).send("Algo fallo!");
        }
    });    
    
});


app.post("/deviceAdd",(req,res,next)=>{
    console.log("Llego el post",
    "INSERT INTO Devices (name, description, state, type) VALUES ('"+req.body.name+"','"+req.body.descript+"', '0','3')");

    utils.query("INSERT INTO Devices (name, description, state, type) VALUES ('"+req.body.name+"','"+req.body.descript+"', '0','3')",(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            //res.status(200).send(JSON.stringify(rsp));
            res.status(200).send("se agrego el dispositivo");
        }else{
            console.log("err",err);
            //res.status(409).send(err);
            res.status(409).send("Algo fallo!");
        }
    });
    
});



app.post("/deviceDel",(req,res,next)=>{
    console.log("Llego el post",
    "DELETE FROM Devices WHERE id = "+req.body.id);

    utils.query("DELETE FROM Devices WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){            
            console.log("rsp",rsp);
            //res.status(200).send(JSON.stringify(rsp));
            res.status(200).send("se elimino el dispositivo");
        }else{
            console.log("err",err);
            //res.status(409).send(err);
            res.status(409).send("Algo fallo!");
        }
    });
    
});

app.post("/deviceEditar",(req,res,next)=>{
    console.log("Llego el post",
    "UPDATE Devices SET name = '"+req.body.name+"', description = '"+req.body.descript+"' WHERE id = "+req.body.id);

    utils.query("UPDATE Devices SET name = '"+req.body.name+"', description = '"+req.body.descript+"' WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){            
            console.log("rsp",rsp);
            //res.status(200).send(JSON.stringify(rsp));
            res.status(200).send("se elimino el dispositivo");
        }else{
            console.log("err",err);
            //res.status(409).send(err);
            res.status(409).send("Algo fallo!");
        }
    });
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
    
});

//=======[ End of file ]=======================================================
