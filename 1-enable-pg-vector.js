import {pgClient} from "./config.js";

// Enables PGVector
// run with:
// node enable-pg-vector
const enablePGVector = async () => {
    await pgClient.connect();
    try {
        const pgResponse = await pgClient.query(`CREATE EXTENSION vector;`);
        console.log(pgResponse.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await pgClient.end();
    }
};

await enablePGVector();