const fs = require('fs');
const path = require('path');
const stylePath = path.join(__dirname, 'styles');
const outputStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);
fs.readdir(stylePath, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    const ext = path.extname(file.name);
    const filePath = path.join(__dirname, file.name);
    fs.stat(filePath, (err, stats) => {
      if (err) console.log(err);
      if (stats.isFile() && ext === '.css') {
        const readStream = fs.createReadStream(
          path.join(stylePath, file.name),
          'utf-8',
        );
        readStream.on('data', (chunk) => {
          outputStream.write(chunk);
        });
      }
    });
  });
});
