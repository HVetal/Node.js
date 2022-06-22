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
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            res.end(`${data}`);
        })
    } else {
        const dirPath = path.join(__dirname, `${req.url}`);
        fs.readdir(dirPath, (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            res.end(`${data.map((el) => el).join("\n")}`);
        })
    }
});

server.listen(3000);