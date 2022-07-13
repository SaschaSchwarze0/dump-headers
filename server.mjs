import { createServer } from 'http';
import { parse as parseURL } from 'url';

const requestListener = (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);

    const url = parseURL(req.url, true);

    if (url.pathname === '/dump-headers') {
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(req.headers, null, 2));
    }

    res.setHeader('Content-Type', 'text/plain');
    return res.end('Hello. :-)');
};

const port = parseInt(process.env.PORT ?? '8080', 10);

const server = createServer(requestListener);
server.listen(port);

console.log(`Server listening on port ${port}.`);

process.on('SIGTERM', () => {
    console.log('Stopping server.');
    server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});
