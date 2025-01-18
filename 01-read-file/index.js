const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname, 'styles'), 'utf-8');
stream.on('data', (chunk) => console.log(chunk));
