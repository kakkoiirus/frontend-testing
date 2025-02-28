const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/frontend-testing'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/frontend-testing'));
});

app.listen(process.env.PORT || 4200);