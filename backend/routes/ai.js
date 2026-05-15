const express = require("express");
const router = express.Router();

const classifyIncident =
  require("../agents/classificationAgent");

router.post("/", async (req, res) => {

  try {

    const { complaint } = req.body;

    const result =
      await classifyIncident(complaint);

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: "Classification failed"
    });
  }
});

module.exports = router;