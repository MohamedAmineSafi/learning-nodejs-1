const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 2: Streams
  const readable = fs.createReadStream('./2-how-node-works/test-file.txt');
  readable.on('data', (chunk) => {
    res.write(chunk);
  });
  readable.on('end', () => {
    res.end();
  });
  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found');
  });

  // Solution 3: Pipe
  const readable2 = fs.createReadStream('./2-how-node-works/test-file.txt');
  readable2.pipe(res);
});

server.listen(8000, 'localhost', () => {
  console.log('Listening...');
});
