function routeIncident(classificationResult) {

  const category = classificationResult.category;

  const routingMap = {
    "Water Infrastructure": {
      department: "Water Authority",
      sla: "2 hours"
    },
    "Traffic": {
      department: "Traffic Department",
      sla: "1 hour"
    },
    "Power": {
      department: "Electricity Authority",
      sla: "30 minutes"
    }
  };

  return routingMap[category] || {
    department: "City Operations",
    sla: "4 hours"
  };
}

module.exports = routeIncident;