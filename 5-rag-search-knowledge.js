import {pgClient, embeddingModel, llmModel} from "./config.js";

// RAG Function
const ragSearch = async () => {
    const testPhrase = "Could you tell me what are the best features to clean my kitchen?";

    // Step 1: Get embedding for the query
    const embeddingRequest = await embeddingModel.embedContent(testPhrase);
    const testPhraseVector = embeddingRequest.embedding.values;

    // Step 2: Retrieve relevant context from PostgreSQL using PGVector
    await pgClient.connect();
    let retrievedContext = "";

    try {
        const pgResponse = await pgClient.query(
            `SELECT * FROM features ORDER BY embedding <-> '${JSON.stringify(testPhraseVector)}' LIMIT 2;`);

        retrievedContext = pgResponse.rows.map(row => row.description).join("\n");
    } catch (err) {
        console.error("Error during PGVector search:", err);
    } finally {
        await pgClient.end();
    }

    if (!retrievedContext) {
        console.log("No relevant context found.");
        return;
    }

    // Step 3: Generate a response using the retrieved context
    const prompt = `You're a helpful documentation bot. 
    Based on the following context, give the answer to the user question:\n\n
    Context:\n${retrievedContext}\n\nQuestion: ${testPhrase}`;

    console.log({prompt});
    const result = await llmModel.generateContent(prompt);
    console.log("Generated Response:", result.response.text());
};

await ragSearch();