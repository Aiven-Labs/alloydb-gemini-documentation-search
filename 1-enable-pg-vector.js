import {alloyDBClient} from "./config.js";

// Enables PGVector
// run with:
// node enable-pg-vector
const enablePGVector = async () => {
    await alloyDBClient.connect();
    try {
        const pgResponse = await alloyDBClient.query(`CREATE EXTENSION vector;`);
        console.log(pgResponse.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await alloyDBClient.end();
    }
};

await enablePGVector();