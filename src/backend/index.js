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

app.get("/devicetoEditar/:id",(req,res,next)=>{

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

app.post("/DeviceChangeState",(req,res,next)=>{

    utils.query("UPDATE Devices SET state = "+req.body.state+" WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send("se cambio el estado del dispositivo");
        }else{
            console.log("err",err);
            res.status(409).send("Algo fallo!");
        }
    });    
    
});

app.post("/DeviceChangeProp",(req,res,next)=>{

    console.log("req",req.body.prop);
    utils.query("UPDATE Devices SET proportional = "+req.body.prop+" WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send("se cambio el estado del dispositivo");
        }else{
            console.log("err",err);
            res.status(409).send("Algo fallo!");
        }
    });    
    
});


app.post("/deviceAdd",(req,res,next)=>{

    if(req.body.type==1 || req.body.type==2){       //Solo si es Sensor le mando la unidad
    var unit = "";
    }else{
    var unit = req.body.unit;
    }

    utils.query("INSERT INTO Devices (name, description, state, proportional, type, unit) VALUES ('"+req.body.name+"','"+req.body.descript+"', '0', '0','"+req.body.type+"', '"+unit+"')",(err,rsp,fields)=>{
        if(err==null){
            
            console.log("rsp",rsp);
            res.status(200).send("se agrego el dispositivo");
        }else{
            console.log("err",err);
            res.status(409).send("Algo fallo!");
        }
    });
    
});

app.post("/deviceDel",(req,res,next)=>{

    utils.query("DELETE FROM Devices WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){            
            console.log("rsp",rsp);
            res.status(200).send("se elimino el dispositivo");
        }else{
            console.log("err",err);
            res.status(409).send("Algo fallo!");
        }
    });
    
});

app.post("/deviceEditar",(req,res,next)=>{

    utils.query("UPDATE Devices SET name = '"+req.body.name+"', description = '"+req.body.descript+"' WHERE id = "+req.body.id,(err,rsp,fields)=>{
        if(err==null){            
            console.log("rsp",rsp);
            res.status(200).send("se elimino el dispositivo");
        }else{
            console.log("err",err);
            res.status(409).send("Algo fallo!");
        }
    });
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");

});

//=======[ End of file ]=======================================================
