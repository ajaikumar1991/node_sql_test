var express = require("express");
var sql = require("mssql");
var app = express();
//var db=require("./db");
var util=require("util");
var path=require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var httpMsgs=require("./httpMsgs");
var dbconfig=
{
    user: "admin_triplepulse",
    password: "10_pulse",
    server: "triplepulse.database.windows.net",
    options: {encrypt: true,database: "TriplePulse"}
};

app.get("/",function (req,res) {
    httpMsgs.showhome(req, res);
});
app.get("/QualMaster", function(req, res) {
    sql.connect(dbconfig, function (err, conn) {
        if (err) {
            console.log(err);
            //res.send(500, "Cannot open connection.");
            httpMsgs.show500(req,res);
        }
        else {
            var request=new sql.Request();
            request.query("SELECT * FROM QualMaster", function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    res.json(results);
                }
            });
        }
    });
});
app.get("/QualMaster/:QualID", function(req, res) {
    var QualID = req.params.QualID;
    sql.connect(dbconfig, function (err) {
        if (err) {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else {
            var request = new sql.Request();
            request.query("SELECT * FROM QualMaster where QualID="+QualID, function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    res.json(results);
                }
            });
        }
    })
});
app.post('/QualMaster',function (req,res) {
    var  post ={
        QualID:req.body.QualID,
        QualTitle:req.body.QualTitle,
        QualShort:req.body.QualShort,
        QualUniversity:req.body.QualUniversity
    };
    console.log(post);
    sql.connect(dbconfig, function (err) {
        if (err) {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else {
            var request = new sql.Request();
            var sql1= "INSERT INTO QualMaster(QualID,QualTitle,QualShort,QualUniversity) values";
            sql1+=util.format("(%d,'%s','%s','%s')",post.QualID,post.QualTitle,post.QualShort,post.QualUniversity);
                        request.query(sql1, function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    res.json(results);
                }
            });
        }
    })
});
app.put('/QualMaster',function (req,res) {
    var  data ={
        QualID:req.body.QualID,
        QualTitle:req.body.QualTitle,
        QualShort:req.body.QualShort,
        QualUniversity:req.body.QualUniversity
    };
    sql.connect(dbconfig, function (err) {
        if (err) {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else {
            var request = new sql.Request();
            var sql1= "UPDATE QualMaster SET";
            var isDataProvided=false;
            if(data.QualShort){
                sql1 += " QualShort='"+data.QualShort+"',";
                isDataProvided=true;
            }
            if(data.QualTitle){
                sql1 += " QualTitle='"+data.QualTitle+"',";
                isDataProvided=true;
            }
            if(data.QualUniversity){
                sql1 += " QualUniversity='"+data.QualUniversity+"',";
                isDataProvided=true;
            }
            sql1=sql1.slice(0,-1);//remove last comma;
            sql1 += "Where QualID="+data.QualID;
            request.query(sql1, function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    res.json(results);
                }
            });
        }
    })
});
app.delete("/QualMaster/", function(req, res) {
    var QualID=req.body.QualID;
    sql.connect(dbconfig, function (err) {
        if (err) {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else {
            var request = new sql.Request();
            request.query("DELETE FROM QualMaster where QualID="+QualID, function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    res.json(results);
                }
            });
        }
    })
});
var server = app.listen(8000,function ()
{
    console.log('server running at : 8000');

});