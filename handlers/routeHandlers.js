import { sendResponse } from "../utils/sendResponse.js";
import { getData } from "../utils/getData.js";
import { serveStatic } from "../utils/serveStatic.js";

export async function handleGet(req, res) {
    sendResponse(res, 200, 'application/json', JSON.stringify(await getData()));
    console.log("Sent items")
}

export async function handlePost(req, res) {
   let body = "";

   req.on("data", chunk => body += chunk);
   req.on("end", () => { console.log("POST BODY:", body); 

        res.writeHead(302, { Location: "/successful-report" }); 
        res.end();
    });
}