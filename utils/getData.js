import dotenv from 'dotenv';
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
);

export async function getData() {
    try {
        const data = await supabase.from("items").select("*");
        return data;
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
};