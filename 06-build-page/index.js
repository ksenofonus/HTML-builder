const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'project-dist');
const disthtmlPath = path.join(dirPath, 'index.html');
const templatePath = path.join(__dirname, 'template.html');
const stylePath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const distAssetsPath = path.join(dirPath, 'assets');
const componentsPath = path.join(__dirname, 'components');
fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) console.log(err);
});
fs.mkdir(distAssetsPath, { recursive: true }, (err) => {
  if (err) console.log(err);
});
const outputStream = fs.createWriteStream(path.join(dirPath, 'style.css'));
fs.readdir(stylePath, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    const ext = path.extname(file.name);
    if (file.isFile && ext === '.css') {
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
fs.readdir(assetsPath, { withFileTypes: true }, (err, folders) => {
  if (err) console.log(err);
  folders.forEach((folder) => {
    fs.stat(path.join(assetsPath, folder.name), (err, stats) => {
      if (err) console.log(err);
      if (stats.isFile()) {
        fs.copyFile(
          path.join(assetsPath, folder.name),
          path.join(distAssetsPath, folder.name),
          (err) => {
            if (err) console.log(err);
          },
        );
      } else {
        fs.readdir(
          path.join(assetsPath, folder.name),
          { withFileTypes: true },
          (err, files) => {
            if (err) console.log(err);
            files.forEach((file) => {
              const filePath = path.join(distAssetsPath, folder.name);
              fs.mkdir(filePath, { recursive: true }, (err) => {
                if (err) console.log(err);
              });
              fs.copyFile(
                path.join(assetsPath, folder.name, file.name),
                path.join(filePath, file.name),
                (err) => {
                  if (err) console.log(err);
                },
              );
            });
          },
        );
      }
    });
  });
});

const htmlWriteStream = fs.createWriteStream(disthtmlPath, { flags: 'w+' });
const templateStream = fs.createReadStream(templatePath, 'utf-8');
templateStream.on('data', (chunk) => {
  let content = chunk;
  fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    files.forEach((file, index) => {
      const componentName = file.name.split('.')[0];
      const componentPath = path.join(componentsPath, file.name);
      const componentReadStream = fs.createReadStream(componentPath, 'utf-8');
      componentReadStream.on('data', (componentChunk) => {
        content = content.replace(`{{${componentName}}}`, `${componentChunk}`);
        if (index === files.length - 1) htmlWriteStream.write(content);
      });
    });
  });
});
