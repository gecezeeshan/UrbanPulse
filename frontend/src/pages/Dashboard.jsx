import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [incidents, setIncidents] = useState([]);
  const [complaint, setComplaint] = useState("");
  const [pipelineResult, setPipelineResult] = useState(null);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    const response =
      await api.get("/incidents");

    setIncidents(response.data);
  };

  const runPipeline = async () => {

    const response =
      await api.post("/incident", {
        complaint
      });

    setPipelineResult(response.data);
  };

  return (
    <div style={{
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <h1>UrbanPulse AI Dashboard</h1>

      <div style={{
        marginBottom: "20px"
      }}>
        <input
          value={complaint}
          onChange={(e) =>
            setComplaint(e.target.value)
          }
          placeholder="Enter incident complaint"
          style={{
            width: "400px",
            padding: "10px"
          }}
        />

        <button
          onClick={runPipeline}
          style={{
            marginLeft: "10px",
            padding: "10px"
          }}
        >
          Analyze Incident
        </button>
      </div>

      <h2>Incident Feed</h2>

      {
        incidents.map((incident) => (
          <div
            key={incident.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px"
            }}
          >
            <h3>{incident.problem}</h3>
            <p>{incident.borough}</p>
            <p>Status: {incident.status}</p>
            <p>Severity: {incident.severity}</p>
          </div>
        ))
      }

      {
        pipelineResult && (
          <div style={{
            marginTop: "30px",
            border: "1px solid black",
            padding: "20px"
          }}>
            <h2>AI Pipeline Result</h2>

            <pre>
              {
                JSON.stringify(
                  pipelineResult,
                  null,
                  2
                )
              }
            </pre>
          </div>
        )
      }

    </div>
  );
}

export default Dashboard;