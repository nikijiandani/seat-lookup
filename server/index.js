const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the Seat Lookup API');
});
app.listen(port, () => {
  console.log(`App listening on port ${port}. Go to http://localhost:${port}`);
});
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that path!");
});