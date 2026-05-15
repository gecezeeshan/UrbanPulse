const express = require("express");
const router = express.Router();

const analyzeSeverity =
  require("../agents/severityAgent");

router.post("/", async (req, res) => {

  try {

    const { complaint, classification } =
      req.body;

    const result =
      await analyzeSeverity(
        complaint,
        classification
      );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: "Severity analysis failed"
    });
  }
});

module.exports = router;