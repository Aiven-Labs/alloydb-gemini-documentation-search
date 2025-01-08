import {pgp, pgpClient, embeddingModel} from "./config.js";

import features from './features.json' assert { type: "json" };

async function populate() {
    const columns =
        new pgp.helpers.ColumnSet(['description', 'embedding'],
            {table: 'features'});

    const rows = [];

    for (const feature of features) {
        const result = await embeddingModel.embedContent(feature);
        rows.push({
            description: feature,
            embedding: result.embedding.values
        })
    }

    // generating a multi-row insert query:
    const query = pgp.helpers.insert(rows, columns);

    // executing the query:
    pgpClient.none(query).then();
}

await populate();