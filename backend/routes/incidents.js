const express = require("express");
const router = express.Router();

const sampleData = [
  {
    id: 1,
    problem: "Water Leakage",
    status: "Open",
    borough: "Brooklyn",
    severity: "High"
  },
  {
    id: 2,
    problem: "Noise Complaint",
    status: "Closed",
    borough: "Queens",
    severity: "Medium"
  }
];

router.get("/", (req, res) => {
  res.json(sampleData);
});

router.get("/:id", (req, res) => {
  const incident = sampleData.find(
    x => x.id === parseInt(req.params.id)
  );

  if (!incident) {
    return res.status(404).json({
      message: "Incident not found"
    });
  }

  res.json(incident);
});

module.exports = router;