const express = require("express");
const router = express.Router();

const findSimilarIncidents =
  require("../agents/similarityAgent");

router.post("/", async (req, res) => {

  try {

    const { complaint } = req.body;

    const result =
      await findSimilarIncidents(
        complaint
      );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: "Similarity search failed"
    });
  }
});

module.exports = router;