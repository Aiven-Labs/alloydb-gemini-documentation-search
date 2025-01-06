import {pgClient} from "./config.js";

// Create table
// run with:
// node create-features-table
const createTable = async () => {
    await pgClient.connect();
    try {
        const pgResponse = await pgClient.query(`CREATE TABLE features (
            description TEXT,
            embedding vector(768)
        );
    `);
        console.log(pgResponse.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await pgClient.end();
    }
};

await createTable();

