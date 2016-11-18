const express = require('express');
let app = express();

let config = require('./server/config/config');

//require('./server/config/database')(config);
require('./server/config/express')(config, app);
require('./server/config/routes')(app);

app.listen(config.port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
//console.log('Express is ready!');
