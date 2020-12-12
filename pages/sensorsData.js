import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { MenuItem, Select, InputLabel } from "@material-ui/core";
import useSWR from "swr";
import SensorContainer from "./sensor";

export default function SensorsData() {
  const { data, error } = useSWR("http://localhost:4000/sensors-ids");
  const [sensorId, setSensorId] = useState("");
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
  return (
    <div>
      <main className={styles.main}>
        <h1>Acá encontrarás tus sensores:</h1>
        <InputLabel id="label">Sensor</InputLabel>
        <Select
          style={{ width: "150px" }}
          onChange={(event) => setSensorId(event.target.value)}
        >
          {data.map((sensorId) => (
            <MenuItem value={sensorId}>{sensorId}</MenuItem>
          ))}
        </Select>
        {sensorId && <SensorContainer sensorId={sensorId} />}
      </main>
    </div>
  );
}
