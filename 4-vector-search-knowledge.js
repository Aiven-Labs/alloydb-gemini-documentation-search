import {pgClient, embeddingModel} from "./config.js";

const vectorSearch = async () => {
    const testPhrase = "I need to clean my fridge";
    const embeddingRequest = await embeddingModel.embedContent(testPhrase);
    const testPhraseVector = embeddingRequest.embedding.values;

    // connecting to Postgres
    await pgClient.connect();
    try {
        // using PGVector extension to find 2 closest vectors from movie_plots in comparison to testPhraseVector
        const pgResponse = await pgClient.query(
            `SELECT * FROM features ORDER BY embedding <-> '${JSON.stringify(testPhraseVector)}' LIMIT 2;`);
        console.log(pgResponse.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await pgClient.end()
    }
}

await vectorSearch();