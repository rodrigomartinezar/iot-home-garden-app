import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import useSWR from "swr";

const formatKelvin = (kelvinT) => Math.round(kelvinT - 273.15);
const charsToReplace = {
  T: " ",
  Z: "",
};

export default function SensorContainer(props) {
  useEffect(() => {
    console.log("value of 'SensorId' changed to", props.sensorId);
  }, [props.sensorId]);

  const { data, error } = useSWR(
    `http://localhost:4000/city-data?sensor_id=${props.sensorId}`
  );
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
  console.log(formatData[0].timestamp);
  return (
    formatData && (
      <div>
        <main className={styles.main}>
          <table>
            <tr>
              <th>Toma</th>
              <th>Fecha toma</th>
              <th>Temperatura</th>
              <th>Humedad</th>
            </tr>
            {formatData.map((sample, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {sample.timestamp.replace(
                      /[TZ]/g,
                      (m) => charsToReplace[m]
                    )}
                  </td>
                  <td>{formatKelvin(sample.data.payload.main.temp)}°C</td>
                  <td>{sample.data.payload.main.humidity}%</td>
                </tr>
              );
            })}
          </table>
        </main>
      </div>
    )
  );
}
