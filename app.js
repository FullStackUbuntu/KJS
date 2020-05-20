const Application = require('./node/sys');

var app = new Application.AppStructure(8888); 

// Single Static Filepaths Routed to Static URL
app.static_url('/', '/public/view/page/index.html');
app.static_url('/index', '/public/view/page/index.html');
app.static_url('/contact', 'public/view/page/contact.html');
app.static_url('/modz/vue.js', '/node_modules/vue/dist/vue.js');
app.static_url('/favicon.ico', '/public/img/favicon.ico');

// Entire Directories, URL filename is dynamic
app.dir('/style', '/public/style');
app.dir('/vue', '/public/vue');