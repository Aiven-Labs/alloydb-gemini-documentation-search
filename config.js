import {GoogleGenerativeAI} from "@google/generative-ai";
import pg from "pg";
import fs from 'fs';
import 'dotenv/config';
import pgPromise from "pg-promise";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004"});

export const llmModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// Connecting to cloud-based PostgreSQL using credentials and ca.pem
// Configuration settings are taken from .env
export const config = {
    user: process.env.ALLOY_DB_USER,
    password: process.env.ALLOY_DB_PASSWORD,
    host: process.env.ALLOY_DB_HOST,
    port: process.env.ALLOY_DB_PORT,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
    },
};

export const pgClient = new pg.Client(config);

export const pgp = pgPromise({
    capSQL: true // capitalize all generated SQL
});

export const pgpClient = pgp(config);