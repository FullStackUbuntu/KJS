const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const events = require('events');
const __apppath = path.dirname(__dirname);


var ee = new events.EventEmitter();




module.exports.AjcLibrary = class AjcLibrary
{
    parseRequest = function parseRequest(request) 
    {
        let __reqpath = url.parse(request.url).pathname;

        let parsedRequest =
        {
            "method": request.method,
            "pathname": __reqpath,
            "extname": path.extname(__reqpath),
            "filename": path.basename(__reqpath),
            "dirname": path.dirname(__reqpath),
            "contenttype": request.headers.accept.split(',')[0]
        };

        console.log('HTTP Request Obj Parsed\nParsed Data:');
        console.log(parsedRequest, '\n\n\n\n\n\n\n\n\n');

        return parsedRequest;
    };



    handle_filepath(fullpath, $request, response)
    {
        console.log('Handle Filepath Called');
        console.log(fullpath);
        console.log($request.contenttype);

        fs.readFile(fullpath, (err, data)=>
        {
            if(err) this.http404(response);

            response.writeHead(200, {"Content-Type" : $request.contenttype});
            response.write(data);
            response.end();
        })
    }


    http400(response)
    {
        let filepath = path.join(__apppath, '/public/view/HTTP_status_msg/status_400.html');

        fs.readFile(filepath, (err, data)=>
        {
            if(err) console.log('HTTP400 has errors, ADMIN ATTENTION NEEDED IMEADIATLEY');

            response.writeHead(400, {"Content-Type" : "text/html"});
            response.write(data);
            response.end();
        })
    }


    http404(response)
    {
        let filepath = path.join(__apppath, '/public/view/HTTP_status_msg/status_404.html');

        fs.readFile(filepath, (err, data)=>
        {
            if(err) console.log('HTTP404 has errors, ADMIN ATTENTION NEEDED IMEADIATLEY');

            response.writeHead(404, {"Content-Type" : "text/html"});
            response.write(data);
            response.end();
        })
    }

};