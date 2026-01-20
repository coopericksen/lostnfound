import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';

import { serveStatic } from './utils/serveStatic.js';
import { getData } from './utils/getData.js';

import { handleGet } from './handlers/routeHandlers.js';
import { handlePost } from './handlers/routeHandlers.js';

const PORT = 8000;

const __dirname = import.meta.dirname;

// console.log(await getData());

const server = http.createServer(async (req, res) => {

    if (req.url === '/api/items') {

        if (req.method === "GET") {
            return await handleGet(res);
        } else if (req.method === "POST") {
            return await handlePost(res);
        }

    } else if (!req.url.startsWith('/api')) {

        return await serveStatic(req, res, __dirname);

    }
});

server.listen(PORT, () => console.log(`Connected to port: ${PORT}`));