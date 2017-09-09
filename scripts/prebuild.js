const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.resolve(__dirname, '../static/css')))
  fs.rmdirSync(path.resolve(__dirname, '../static/css'));
if (fs.existsSync(path.resolve(__dirname, '../static/js')))
  fs.rmdirSync(path.resolve(__dirname, '../static/js'));

fs.mkdirSync(path.resolve(__dirname, '../static/css'));
fs.mkdirSync(path.resolve(__dirname, '../static/js'));

fs.createReadStream(path.resolve(__dirname, '../node_modules/normalize.css/normalize.css'))
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../static/css/normalize.css')));

fs.createReadStream(path.resolve(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css'))
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../static/css/bootstrap.min.css')));
fs.createReadStream(path.resolve(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.min.js'))
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../static/js/bootstrap.min.js')));
