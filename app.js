"use strict";

let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(port, function() {
  console.log("Application is started and listening on port " + port);
});
