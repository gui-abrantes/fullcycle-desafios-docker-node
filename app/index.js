const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const faker = require('faker')
const asyncHandler = require('express-async-handler')

app.get('/', asyncHandler(async (req, res) => {
  await db.createTablePeople();
  await db.insertPeople(faker.name.findName());
  let people = await db.selectPeoples();

  var peopleNames = "";
  people.forEach(people => {
    peopleNames += `<h3>${people.name}</h3>\n`
  });

  var msg = '<h1>Full Cycle Rocks!</h1>' + '\n' + peopleNames
  res.send(msg)
}));

app.listen(port,"0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`)
})