const express = require('express');
const mkdirp = require('mkdirp');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4567;
const getDirName = require('path').dirname;
const filePath = './songList.txt';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


const appendFile = (path, contents, cb) => {
  mkdirp(getDirName(path), function (err) {
    if (err) {
      return cb(err);
    }
    fs.appendFile(path, contents + "\n", function (err, data) {
      if (err) {
        return cb(err);
      }
      cb(null, data);
    });
  });
};

const readFile = (path, cb) => {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      return cb(err);
    }
    cb(null, data);
  });
};

const deleteFile = (path, cb) => {
  fs.unlink(path, function (err, data) {
    if (err) {
      return cb(err);
    }
    cb(null, data);
  });
};

app.post('/api/songs', function (req, res) {
  appendFile(filePath, req.body.songURL, (err, response) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    res.send(response);
  });
});

app.delete('/api/songs/all', function (req, res) {
  deleteFile(filePath, (err, response) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    res.send(response);
  });
});


app.get('/api/songs/all', function (req, res) {
  readFile(filePath, (err, response) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    res.send(response);
  });
});

app.listen(port);
console.log('Server started! At http://localhost:' + port);