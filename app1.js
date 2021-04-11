//root file node js file execute
//Till course 24-35
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>This is the form</title></head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST">');
        res.write('<input type="text" name="message">');
        res.write('<input type="submit" value="Submit"  />');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');

        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);// can be do in async with write ()
            res.statusCode = 302;
            res.setHeader('Location', '/');

            return res.end();
        })
    }

    //set header
    //saying header is html content
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html>
        <head>
            <title>Samle Text</title>
        </head>
        <body>
            <h2>This is from server</h2>
        </body>
    </html>`);
    res.end();

})

server.listen(3000);