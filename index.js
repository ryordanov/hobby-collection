const express = require('express');
let app = express();

let config = require('./server/config/config');

//require('./server/config/database')(config);
require('./server/config/express')(config, app);
require('./server/config/routes')(app);

app.listen(config.port);
//console.log('Express is ready!');
