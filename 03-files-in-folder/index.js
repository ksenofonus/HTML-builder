const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const fileExt = path.extname(filePath).replace('.', '');
        const fileName = file.name.split('.')[0];
        fs.stat(filePath, (err, stats) => {
          if (err) console.log(err);
          else console.log(`${fileName} - ${fileExt} - ${stats.size / 1024}b`);
        });
      }
    });
  }
});
