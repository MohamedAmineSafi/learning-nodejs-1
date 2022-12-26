const fs = require('fs');
// const http = require('http');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    // RESOLVE AND REJECT ARE IN ORDER (Learned that the hard way)
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject('File not found');
      } else {
        resolve(data);
      }
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject('Error while writing the file');
      } else {
        resolve('Dog Image Saved');
      }
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro(`${__dirname}/dogImage.txt`, res.body.message);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err.message);
  });
