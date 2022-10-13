const express = require("express"),
    app = express(),
    port = process.env.port || 3000
    routes = require('./routes.js');

routes(app);
app.listen(port);