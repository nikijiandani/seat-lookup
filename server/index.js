const express = require('express');
const data = require('./data/MOCK_DATA.json');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/people', (req, res) => {
  let firstName = req.query.firstName || '';
  let lastName = req.query.lastName || '';
  let result;

  if (firstName) {
    result = data.filter(person => person.first_name === firstName);
    if (lastName) {
      result = result.filter(person => person.last_name === lastName);
    }
  }

  if (lastName) {
    result = data.filter(person => person.last_name === lastName);
    if (firstName) {
      result = result.filter(person => person.first_name === firstName);
    }
  }

  if (!result) {
    res.send(
      'Welcome to the internal people search directory. You can query this API with firstName and lastName query parameters.'
    );
  } else if (result.length > 0) {
    res.json(result);
  } else {
    res.send(`Sorry, cannot find ${firstName} ${lastName} in the system`);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}. Go to http://localhost:${port}`);
});
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that path!");
});
