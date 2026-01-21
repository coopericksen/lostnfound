import { sendResponse } from "../utils/sendResponse.js";
import { getData } from "../utils/getData.js";

export async function handleGet(res) {
    sendResponse(res, 200, 'application/json', JSON.stringify(await getData()));
    console.log("Sent items")
}

export async function handlePost(res) {
    console.log("POST request recieved.");
}