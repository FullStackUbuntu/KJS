const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const events = require('events');
const _apppath = path.dirname(__dirname);
const AJC = require('./lib');


//Note: Remember to Create MOD OBJz w/ a 'NEW' statment.
var ee = new events.EventEmitter();
var ajc = new AJC.AjcLibrary();



// APPLICATION SERVER CLASS
module.exports.AppStructure = class AppStructure
{


    constructor(port)
    {
        http.createServer(this.onRequest).listen(port);
        console.log('\n\n\n\n', 'Server_Created', '\n\n\n\n');
    }




    onRequest = function onRequest(request, response)
    {
        console.log('\n\n\n\n', '========[-Request_Recieved-]========\n');

        let $request = ajc.parseRequest(request);
        let evtName = 'static_url_' + $request.pathname;

        ee.emit(evtName, $request, response);

        if(ee.listenerCount(evtName) === 0)
        {
            evtName = 'dir_' + $request.dirname;
            ee.emit(evtName, $request, response);
            
            if(ee.listenerCount(evtName) === 0) ajc.http404(response);
            
            else if(ee.listenerCount(evtName) > 1) throw console.error('A single URL is routed twice, onRequest EVT-triggercount > 1');
        } 
        
        else if(ee.listenerCount(evtName) > 1) throw console.error('A single URL is routed twice, onRequest EVT-triggercount > 1');
    };





    static_url(url, _filepath)
    {
        let evtName = 'static_url_' + url;

        ee.on(evtName, function ($request, response)
        {
            let _fullpath = path.join(_apppath, _filepath);
        
            fs.existsSync(_fullpath) ? ajc.handle_filepath(_fullpath, $request, response) : ajc.http404(response);
        });
    };






    dir(url, _dirpath)
    {
        let evtName = 'dir_' + url;

        ee.on(evtName, function ($request, response)
        {
            let _fullfilepath = path.join(_apppath, _dirpath, $request.filename);

            fs.existsSync(_fullfilepath) ? ajc.handle_filepath(_fullfilepath, $request, response) : ajc.http404(response);
        });
    }
};



