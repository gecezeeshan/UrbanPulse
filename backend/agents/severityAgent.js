const client = require("../services/aiService");

async function analyzeSeverity(
  incidentText,
  classificationResult
) {

  const prompt = `
You are an enterprise Smart City Severity AI Agent.

Incident:
"${incidentText}"

Classification:
${JSON.stringify(classificationResult)}

Return JSON only:
{
  "severity": "",
  "impactScore": 0,
  "escalationRisk": 0,
  "reason": ""
}
`;

  try {

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

  } catch (error) {

    return {
      severity: "Medium",
      impactScore: 5,
      escalationRisk: 50,
      reason: "Fallback response"
    };
  }
}

module.exports = analyzeSeverity;