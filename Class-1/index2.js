let http = require("http");
let { appendFile } = require("fs");

http.createServer((req, res) => {
    readFile("myfile.html", (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("File not found");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
        }
        res.end();
    });
}).listen(8080, () => {
    console.log("Running")
});