import * as d3 from "d3";
import { format } from "d3";
import styles from "../styles/Home.module.css";

const formatKelvin = (kelvinT) => kelvinT - 273.15;

const charsToReplace = {
  T: " ",
  Z: "",
};

const arrayOfTemperature = (data) =>
  data.map((sample) => formatKelvin(sample.data.payload.main.temp));

const arrayOfHumidity = (data) =>
  data.map((sample) => sample.data.payload.main.humidity);

const arrayOfTime = (data) => {
  data
    .map((sample) =>
      sample.timestamp.replace(/[TZ]/g, (m) => charsToReplace[m])
    )
    .map((unformattedDate) => {
      const formatter = d3.timeFormat("%Y-%m-d %h:%M:%S");
      return formatter(unformattedDate);
    });
};

const yScale = (data) => d3.scaleLinear().domain([0, Math.max(...data)]);

const SeriesChart = (props) => {
  const { formatData } = props;
  console.log(arrayOfTime(formatData));
  return (
    formatData && (
      <div>
        <main className={styles.main}>
          <h1>Hola desde el componente</h1>
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
};

export default SeriesChart;
