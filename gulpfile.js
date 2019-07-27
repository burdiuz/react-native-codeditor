/* eslint-disable implicit-arrow-linebreak) */
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

const through2 = require('through2');

const sourceFiles = [
  './files/editor.html',
  './node_modules/@actualwave/messageport-dispatcher/dist/messageport-dispatcher.min.js',
  './files/initscript.js',
];

const createStream = (data) => {
  return through2.obj((target, enc, cb) => {
    const { base } = path.parse(target.path);

    console.log('Add module: ', base);
    data[base] = target.contents.toString();

    cb();
  });
};

const loadFileData = (filePath, data) => {
  return new Promise((res) => {
    gulp
      .src(filePath)
      .pipe(createStream(data))
      .pipe(gulp.dest('./tmp/'))
      .on('end', () => {
        res(data);
      });
  });
};

const loadData = (files, data = {}) =>
  new Promise((res, rej) => {
    Promise.all(files.map((file) => loadFileData(file, data)))
      .then(() => res(data))
      .catch(rej);
  });

const createBundle = (files) =>
  loadData(files).then((data) => {
    if (!fs.existsSync('./source/assets')) {
      fs.mkdirSync('./source/assets');
    }

    fs.writeFileSync('./source/assets/webview_bundle.json', JSON.stringify(data, null, 2));
  });

const webview = () => createBundle(sourceFiles);

exports.webview = webview;
exports.default = gulp.series(webview);
