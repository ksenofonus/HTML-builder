const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');
fs.mkdir(copyPath, { recursive: true }, (err) => {
  if (err) console.log(err);
});
fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    fs.copyFile(
      path.join(folderPath, file.name),
      path.join(copyPath, file.name),
      (err) => {
        if (err) console.log(err);
      },
    );
  });
});
