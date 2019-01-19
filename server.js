const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const buffer = fs.readFileSync('./data.json');
const persons = JSON.parse(buffer);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static('uploads'));

// File upload setup

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('image');

app.get('/persons', (req, res) => {
  if (persons.length > 0) {
    timeoutDuration = 5000;
    setTimeout(() => res.json(persons), timeoutDuration);
  } else {
    console.log(404, 'all');
    res.status(404).json({ error: 'Person not found :_(' });
  }
});

app.get('/persons/:id', (req, res) => {
  const person = persons.find(item => item.id == req.params.id);
  if (person) {
    console.log(person.name);
    timeoutDuration = Math.floor(Math.random() * 5000);
    setTimeout(() => res.json(person), timeoutDuration);
  } else {
    console.log(404, req.params.id);
    res.status(404).json({ error: 'Person not found :_(' });
  }
});

// Save new restaurant
app.post('/persons', function(req, res) {
  const nextIndexObj = { id: persons.length };
  const newPerson = Object.assign(nextIndexObj, req.body);
  persons.push(newPerson);
  console.log(newPerson);
  res.json(persons);
});

app.post('/persons/:id', (req, res) => {
    var person = persons.find(item => item.id == req.params.id);
    if (person) {
        console.log(person.name);
        timeoutDuration = Math.floor(Math.random() * 5000);
        const index = persons.indexOf(person);
        persons[index] = req.body
        setTimeout(() => res.json(person), timeoutDuration);
    } else {
        res.status(404).json({ error: 'Person not found :_(' });
    }
});

// Upload a photo
app.post('/upload', function(req, res) {
  console.log('upload called');
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end('Error uploading file.');
    }
    res.end('File is uploaded successfully!');
  });
});

console.log(`Starting server on port 8080`);
app.listen(8080);