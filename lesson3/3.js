const fs = require("fs");
const {
    Transform
} = require("stream");

const ip_address1 = "89.123.1.41";
const ip_address2 = "34.48.240.111";

const readStream = fs.createReadStream("./access.log", "utf8");
const writeStream1 = fs.createWriteStream(`./${ip_address1}_requests.log`, {
    flags: "a",
    encoding: "utf-8",
});

const writeStream2 = fs.createWriteStream(`./${ip_address2}_requests.log`, {
    flags: "a",
    encoding: "utf-8",
});

const transformStream1 = new Transform({
    transform(chunk, encoding, callback) {
        const transformedChunk = chunk.toString().match(/89.123.1.41.*/g).join("\n");
        callback(null, transformedChunk);
    },
});

const transformStream2 = new Transform({
    transform(chunk, encoding, callback) {
        const transformedChunk = chunk.toString().match(/34.48.240.111.*/g).join("\n");
        callback(null, transformedChunk);
    },
});
readStream.pipe(transformStream1).pipe(writeStream1);
readStream.pipe(transformStream2).pipe(writeStream2);