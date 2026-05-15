const client = require("../services/aiService");

async function classifyIncident(text) {

  const prompt = `
You are a smart city incident classification AI.

Classify this complaint:

"${text}"

Return JSON only:
{
  "category": "",
  "subcategory": "",
  "priority": ""
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2,
    response_format: {
      type: "json_object"
    }
  });

  return JSON.parse(
    response.choices[0].message.content
  );
}

module.exports = classifyIncident;