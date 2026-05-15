const client = require("../services/aiService");

async function generateSummary(data) {

  const prompt = `
You are a Smart City Operations AI.

DATA:
${JSON.stringify(data)}

Return JSON only:
{
  "summary": "",
  "recommendedAction": "",
  "riskLevel": "",
  "confidence": 0
}
`;

  const response =
    await client.chat.completions.create({
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

module.exports = generateSummary;