import { useEffect } from "react";
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
  return <SeriesChart formatData={formatData} />;
}
