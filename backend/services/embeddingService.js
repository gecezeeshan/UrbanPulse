const client = require("./aiService");

async function generateEmbedding(text) {

  const response = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: text
  });

  return response.data[0].embedding;
}

module.exports = generateEmbedding;