import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import useSWR from "swr";

export default function SensorContainer(props) {
  useEffect(() => {
    console.log("value of 'SensorId' changed to", props.sensorId);
  }, [props.sensorId]);

  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Sensor-Id": props.sensorId,
      },
    }).then((response) => response.json());

  const { data, error } = useSWR("http://localhost:4000/city-data", fetcher);
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
    <main className={styles.main}>
      <h1>Hola! {props.sensorId}</h1>
      <div>{data}</div>
    </main>
  );
}
