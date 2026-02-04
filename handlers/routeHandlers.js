import { sendResponse } from "../utils/sendResponse.js";
import { getData } from "../utils/getData.js";
import { postData } from "../utils/postData.js";
import { parseJSON } from "../utils/parseJSON.js";

import dotenv from 'dotenv';
dotenv.config();

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

export async function handleGet(req, res) {
    if (req.headers["x-fetch-approved"] === "true") {
        sendResponse(res, 200, 'application/json', JSON.stringify(await getData(true)));
        console.log("Sent items")
    } else if (req.headers["x-admin-username"] === process.env.ADMIN_USERNAME && req.headers["x-admin-password"] === process.env.ADMIN_PASSWORD) {
        sendResponse(res, 200, 'application/json', JSON.stringify(await getData(false)));
    } else {
        return sendResponse(res, 403, 'application/json', JSON.stringify({ error: "Forbidden" }));
    }
}

export async function handlePost(req, res) {
    postData(req, res);
}

export async function handleAdminLogin(req, res) {
    const { username, password } = await parseJSON(req);
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
        return sendResponse(res, 403, 'application/json', JSON.stringify({ error: "Forbidden" }));
    }

    return sendResponse(res, 200, 'application/json', JSON.stringify({ message: "Logged in." }));

}

export async function handleItemApproval(req, res) {
    const username = req.headers["x-admin-username"];
    const password = req.headers["x-admin-password"];

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
        return sendResponse(res, 403, 'application/json', JSON.stringify({ error: "Forbidden" }));
    }

    const itemId = req.headers["x-item-id"];
    if (!itemId) {
        return sendResponse(res, 400, 'application/json', JSON.stringify({ error: "Missing item ID" }));
    }

    const { data, error } = await supabase
        .from("items")
        .update({ approved: true })
        .eq("id", itemId);

    if (error) {
        return sendResponse(res, 500, 'application/json', JSON.stringify({ error: error.message }));
    }

    return sendResponse(res, 200, 'application/json', JSON.stringify({ message: "Item approved", data }));

}