var settings = require("./settings");

exports.show500 = function (req,res,err){
    if(settings.httpMsgsFormat==="HTML") {
        res.writeHead(500, "Internal Server Error occured", {"Content-Type": "text/html"});
        res.write("<html><title>500<head><body>500: Internal Server Error, Details:" + err + "</body></head></title></html>");
    }
    else {
        res.writeHead(500, "Internal Server Error occured", {"Content-Type": "application/json"});
        res.write(JSON.stringify({data:"ERROR OCCURED" + err}));
    }
};

exports.sendJson=function (req,res,data) {
    res.writeHead(200,{"Content-Type": "application/json"});
    if(data){
        res.write(JSON.stringify(data));
    }
    res.end();
};

exports.show405 = function (req,res){
    if(settings.httpMsgsFormat==="HTML") {
        res.writeHead(405, "Method Not Found", {"Content-Type": "text/html"});
        res.write("<html><title>405<head><body>405: Method Not Found</body></head></title></html>");
    }
    else {
        res.writeHead(405, "Method Not Found", {"Content-Type": "application/json"});
        res.write(JSON.stringify({data:"Method Not Found"}));
    }
    res.end();
};

exports.show404 = function (req,res){
    if(settings.httpMsgsFormat==="HTML") {
        res.writeHead(404, "Resource Not Found", {"Content-Type": "text/html"});
        res.write("<html><title>405<head><body>405: Resource Not Found</body></head></title></html>");
    }
    else {
        res.writeHead(404, "Resource Not Found", {"Content-Type": "application/json"});
        res.write(JSON.stringify({data:"Resource Not Found"}));
    }
    res.end();
};

exports.show413 = function (req,res){
    if(settings.httpMsgsFormat==="HTML") {
        res.writeHead(413, "Request Entity is too large", {"Content-Type": "text/html"});
        res.write("<html><title>413<head><body>413: Request Entity is too large</body></head></title></html>");
    }
    else {
        res.writeHead(413, "Request Entity is too large", {"Content-Type": "application/json"});
        res.write(JSON.stringify({data:"Request Entity is too large"}));
    }

    res.end();
};

exports.Send200 = function (req,res){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end();
};

exports.showhome = function (req,res){

        res.writeHead(200,{"Content-Type": "application/json"});
        res.write(JSON.stringify([
            {"url":"/QualMaster","operation":"GET","Description":"To List all the details of the QualMaster Table"},
            {"url":"/QualMaster/QualID","operation":"GET","Description":"To List all details of the specific QualID"},
            {"url":"/QualMaster","operation":"POST","Description":"To INSERT new record into the QualMaster Table"},
            {"url":"/QualMaster","operation":"PUT","Description":"To UPDATE record based on the QualID"},
            {"url":"/QualMaster","operation":"DELETE","Description":"To DELETE record based on the QualID"}
        ]));
        res.end();
};

