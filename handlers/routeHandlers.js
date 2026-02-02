import { sendResponse } from "../utils/sendResponse.js";
import { getData } from "../utils/getData.js";
import { serveStatic } from "../utils/serveStatic.js";
import { postData } from "../utils/postData.js";

export async function handleGet(req, res) {
    sendResponse(res, 200, 'application/json', JSON.stringify(await getData()));
    console.log("Sent items")
}

export async function handlePost(req, res) {
    postData(req, res);
}