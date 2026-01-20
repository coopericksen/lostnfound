import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handleGet(res) {
    const data = await getData();
    const content = JSON.stringify(data);
    sendResponse(res, 200, 'application/json', content);
    console.log("Sent items")
}

export async function handlePost(res) {
    console.log("POST request recieved.");
}