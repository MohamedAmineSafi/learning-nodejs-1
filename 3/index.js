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

// Looks synchronic but actually is asynchronous
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(data);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro(`${__dirname}/dogImage.txt`, imgs.join('\n'));
    console.log('dog image saved');
  } catch (err) {
    console.log('ERR');
    throw err;
  }

  return 'HI 123';
};

// console.log('-----------');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('*********');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

(async () => {
  try {
    console.log('-----------');
    const x = await getDogPic();
    console.log(x);
    console.log('*********');
  } catch (err) {
    console.log(err);
  }
})(); // Declare a function and call it right away
