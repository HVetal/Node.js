const http = require("http");
const path = require("path");
const fs = require("fs");
let list = "";
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url);
    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile();
    }
    if (isFile(__dirname + req.url)) {
        const readStream = fs.createReadStream(filePath, "utf8");
        readStream.on("data", (chunk) => {
            list = list + chunk;
            res.end(`${list}`);
        });
    } else {
        const dirPath = path.join(__dirname, `${req.url}`);
        list = fs.readdirSync(dirPath);
        res.end(`${list.map((el) => el).join("\n")}`);
    }
});

server.listen(3000);