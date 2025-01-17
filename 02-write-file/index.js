const fs = require('fs');
const path = require('path');
const readline = require('readline');
const outputStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
rl.setPrompt('Please enter your line ');
rl.prompt();
rl.on('line', (data) => {
  if (data === 'exit') {
    console.log('Good bye');
    rl.close();
  } else {
    outputStream.write(`${data}`);
    rl.close();
  }
});
