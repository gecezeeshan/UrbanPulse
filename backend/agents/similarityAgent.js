const generateEmbedding =
  require("../services/embeddingService");

const cosineSimilarity =
  require("../utils/cosineSimilarity");

const incidents =
  require("../data/historicalIncidents");

async function findSimilarIncidents(query) {

  try {

    const queryEmbedding =
      await generateEmbedding(query);

    const results = [];

    for (const incident of incidents) {

      const incidentEmbedding =
        await generateEmbedding(
          incident.complaint
        );

      const similarityScore =
        cosineSimilarity(
          queryEmbedding,
          incidentEmbedding
        );

      results.push({
        ...incident,
        similarityScore
      });
    }

    results.sort(
      (a, b) =>
        b.similarityScore - a.similarityScore
    );

    return results.slice(0, 3);

  } catch (error) {

    return [];
  }
}

module.exports = findSimilarIncidents;