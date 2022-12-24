const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  fs.readFile('./2-how-node-works/test-file.txt', (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
});

server.listen(8000, 'localhost', () => {
  console.log('Listening...');
});
