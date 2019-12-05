const express = require('express');
const data = require('./data/MOCK_DATA.json');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/people', (req, res) => {
  let { firstName, lastName } = req.query;
  const result = data.filter(
    person =>
      (!firstName ||
        person.first_name.toLowerCase() === firstName.toLowerCase()) &&
      (!lastName || person.last_name.toLowerCase() === lastName.toLowerCase())
  );

  if (!firstName && !lastName) {
    res.send(
      'Welcome to the internal people search directory. You can query this API with firstName and lastName query parameters.'
    );
  } else {
    return res.json(result);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}. Go to http://localhost:${port}`);
});
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that path!");
});
