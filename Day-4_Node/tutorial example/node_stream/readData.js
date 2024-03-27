const fs = require('fs');
const { get } = require('http');
//create a read stream
const readStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

const getData = (res) => {
  //res is a writable stream. we are writing through the readstream pipe line.
  readStream.pipe(res)
}

module.exports = getData;