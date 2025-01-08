import {alloyDBClient} from "./config.js";

// Create table
// run with:
// node create-features-table
const createTable = async () => {
    await alloyDBClient.connect();
    try {
        const pgResponse = await alloyDBClient.query(`CREATE TABLE features (
            description TEXT,
            embedding vector(768)
        );
    `);
        console.log(pgResponse.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await alloyDBClient.end();
    }
};

await createTable();

