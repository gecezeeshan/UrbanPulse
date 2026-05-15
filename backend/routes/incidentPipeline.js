const express = require("express");
const router = express.Router();

const classifyIncident =
  require("../agents/classificationAgent");

const routeIncident =
  require("../agents/routingAgent");

const analyzeSeverity =
  require("../agents/severityAgent");

const findSimilarIncidents =
  require("../agents/similarityAgent");

const generateSummary =
  require("../agents/summaryAgent");

router.post("/", async (req, res) => {

  try {

    const { complaint } = req.body;

    const classification =
      await classifyIncident(complaint);

    const routing =
      routeIncident(classification);

    const severity =
      await analyzeSeverity(
        complaint,
        classification
      );

    const similarIncidents =
      await findSimilarIncidents(
        complaint
      );

    const finalOutput =
      await generateSummary({
        complaint,
        classification,
        routing,
        severity,
        similarIncidents
      });

    res.json({
      input: complaint,
      classification,
      routing,
      severity,
      similarIncidents,
      finalOutput
    });

  } catch (error) {

    res.status(500).json({
      message: "Incident pipeline failed"
    });
  }
});

module.exports = router;