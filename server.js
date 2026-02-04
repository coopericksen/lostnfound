import http from 'node:http';

import { serveStatic } from './utils/serveStatic.js';

import { handleGet } from './handlers/routeHandlers.js';
import { handlePost } from './handlers/routeHandlers.js';
import { handleAdminLogin } from './handlers/routeHandlers.js';
import { handleItemApproval } from './handlers/routeHandlers.js';

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    if (req.url === "/api/items") {
        if (req.method === "GET") {
            return handleGet(req, res);
        } else if (req.method === "POST") {
            return handlePost(req, res);
        }
    }

    if (req.url === "/api/admin") {
        return handleAdminLogin(req, res);
    }

    if (req.url === "/api/admin/approve") {
        return handleItemApproval(req, res);
    }

    return await serveStatic(req, res, __dirname);

});

server.listen(PORT, () => console.log(`Connected to port: ${PORT}`));