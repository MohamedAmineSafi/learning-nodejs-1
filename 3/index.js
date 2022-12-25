const fs = require('fs');
// const http = require('http');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  console.log(data);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(res.body.message);

      fs.writeFile(`${__dirname}/dogImage.txt`, res.body.message, (err) => {
        console.log('Dog Image Saved');
      });
    });
});
