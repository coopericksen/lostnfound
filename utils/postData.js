import dotenv from 'dotenv';
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import Busboy from "busboy";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
);

export async function postData(req, res) {
    const busboy = Busboy({ headers: req.headers });

    const form_data = {};
    let file_buffer = null;
    let file_name = null;
    let file_mime = null;

    // Collect file packets
    busboy.on("file", (fieldname, file, info) => {
        file_name = info.filename;
        file_mime = info.mimeType;

        const chunks = [];
        file.on("data", (data) => {
            chunks.push(data);
        });
        file.on("end", () => {
            file_buffer = Buffer.concat(chunks);
        });
    });

    // Collect text fields
    busboy.on("field", (fieldname, value) => {
        form_data[fieldname] = value;
    });

    busboy.on("finish", async () => {
        try {
            // Store image in bucket and save public url
            let image_url = null;

            if (file_buffer) {
                const ext = file_name.split(".").pop();
                const new_file_name = `${Date.now()}.${ext}`;
                const file_path = `uploads/${new_file_name}`;

                const { error: upload_error } = await supabase.storage
                    .from("lostnfound-images")
                    .upload(file_path, file_buffer, {
                        contentType: file_mime,
                        upsert: false
                    });

                if (upload_error) throw upload_error;

                // Get public url
                const { data: public_url } = supabase.storage
                    .from("lostnfound-images")
                    .getPublicUrl(file_path);

                image_url = public_url.publicUrl;

            }

            // Post data to db
            delete form_data.image; // clear original upload from form_data
            const { error: db_error } = await supabase
                .from("items")
                .insert({
                    // ... is the js spread operator; destructures key/value pairs
                    ...form_data,
                    image_url: image_url
                });

            if (db_error) throw db_error;

            console.log("Data successfully posted.");
            res.writeHead(302, { Location: "/successful-report" });
            res.end();

        } catch (error) {
            console.log("Upload error: ", error);
            res.writeHead(500);
            res.end("Internal server error: " + error.message);
        }
    });

    req.pipe(busboy);
};