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
    
    
    
    /*devices = [
        { 
            'id': 1, 
            'name': 'Luces balcon', 
            'description': 'Luces tipo guirnalda', 
            'state': 1, 
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
            'state': 1, 
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
            'state': 1, 
            'type': 5, 
        }
    ]
    res.send(JSON.stringify(devices)).status(200);*/

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

//INSERT INTO `Devices`(`name`, `description`, `state`, `type`) VALUES ('Nuevo','para prueba','0','1');

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

/*
app.post("/deviceDel",(req,res,next)=>{
    console.log("Llego el post",
    "DELETE Devices WHERE id = "+req.body.id);
    if(req.body.name==""){
        res.status(409).send("no tengo nada que hacer");
    }else{
        res.status(200).send("se elimino el dispositivo con id: "+req.body.id);
    }
    
});
*/


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
