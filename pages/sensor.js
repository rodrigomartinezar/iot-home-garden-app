import { useState, useEffect } from "react";
import { Button, Switch, FormControlLabel } from "@material-ui/core";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import SeriesChart from "../components/seriesChart";

export default function SensorContainer(props) {
  useEffect(() => {
    console.log("value of 'SensorId' changed to", props.sensorId);
  }, [props.sensorId]);

  const { data, error } = useSWR(
    `http://localhost:4000/city-data?sensor_id=${props.sensorId}`
  );

  const [variableToPlot, setVariableToPlot] = useState("temperatura");

  if (error) {
    return (
      <main className={styles.main}>
        <div>failed to load data</div>
      </main>
    );
  }
  if (!data) {
    return (
      <main className={styles.main}>
        <div>loading</div>
      </main>
    );
  }
  const formatData = JSON.parse(JSON.stringify(data));
  return (
    <div>
      <div>
        <SeriesChart formatData={formatData} variableToPlot={variableToPlot} />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setVariableToPlot("temperatura")}
        >
          Temperatura
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setVariableToPlot("humedad")}
        >
          Humedad
        </Button>
        <FormControlLabel
          style={{ paddingLeft: "10px" }}
          control={<Switch color="Primary" />}
          label="Riego"
        />
      </div>
    </div>
  );
}
