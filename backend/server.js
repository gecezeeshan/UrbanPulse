const express = require("express");
const cors = require("cors");
require("dotenv").config();

const incidentsRoutes = require("./routes/incidents");
const aiRoutes = require("./routes/ai");
const severityRoutes = require("./routes/severity");
const similarityRoutes = require("./routes/similarity");
const incidentPipelineRoutes = require("./routes/incidentPipeline");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentsRoutes);
app.use("/api/classify", aiRoutes);
app.use("/api/severity", severityRoutes);
app.use("/api/similarity", similarityRoutes);
app.use("/api/incident", incidentPipelineRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`UrbanPulse Backend running on port ${PORT}`);
});