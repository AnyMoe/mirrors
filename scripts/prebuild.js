const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.resolve(__dirname, '../static/css/'))) {
  fs.mkdirSync(path.resolve(__dirname, '../static/css/'))
}

fs.createReadStream(path.resolve(__dirname, '../node_modules/normalize.css/normalize.css'))
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../static/css/normalize.css')));
fs.createReadStream(path.resolve(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css'))
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../static/css/bootstrap.min.css')));
