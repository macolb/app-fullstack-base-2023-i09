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

app.get("/users",(req,res,next)=>{
    res.send("Listo");
    
});

app.get('/devices/', function(req, res, next) {
    devices = [
        { 
            'id': 1, 
            'name': 'Luces balcon', 
            'description': 'Luces tipo guirnalda', 
            'state': 0, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Bomba riego', 
            'description': 'Bomba de riego automatica', 
            'state': 0, 
            'type': 2, 
        },
        { 
            'id': 3, 
            'name': 'Pulverizador', 
            'description': 'Plantas de poco riego', 
            'state': 0, 
            'type': 3, 
        },
        { 
            'id': 4, 
            'name': 'Parlante', 
            'description': 'Rele en enchufe', 
            'state': 0, 
            'type': 4, 
        },
        { 
            'id': 5, 
            'name': 'TV', 
            'description': 'TV led Habitacion', 
            'state': 0, 
            'type': 5, 
        }
    ]
    res.send(JSON.stringify(devices)).status(200);
});


//=====================POST Functions============================

app.post("/device",(req,res,next)=>{
    console.log("Llego el post",
    "UPDATE Devices SET state = "+req.body.state+" WHERE id = "+req.body.id);
    if(req.body.name==""){
        res.status(409).send("no tengo nada que hacer");
    }else{
        res.status(200).send("se guardo el dispositivo");
    }
    
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
