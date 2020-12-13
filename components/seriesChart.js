import { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../styles/Home.module.css";

const formatKelvin = (kelvinT) => kelvinT - 273.15;

const charsToReplace = {
  T: " ",
  Z: "",
};

const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const width = 460 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const arrayOfTemperature = (data) =>
  data.map((sample) => formatKelvin(sample.data.payload.main.temp));

const arrayOfHumidity = (data) =>
  data.map((sample) => sample.data.payload.main.humidity);

const arrayOfTime = (data) => {
  return data
    .map((sample) =>
      sample.timestamp.replace(/[TZ]/g, (m) => charsToReplace[m])
    )
    .map((unformattedDate) => {
      const formatter = d3.timeParse("%Y-%m-%d %H:%M:%S");
      return formatter(unformattedDate);
    });
};

const xScale = (data) =>
  d3
    .scaleTime()
    .domain(d3.extent(arrayOfTime(data)))
    .range([0, width]);

const yScale = (data) =>
  d3
    .scaleLinear()
    .domain([0, Math.max(...data)])
    .range([height, 0]);

const SeriesChart = (props) => {
  const { formatData } = props;

  const xAxis = useRef();
  const yAxis = useRef();
  const chartRef = useRef();

  const xAxisGenerator = d3.axisBottom(xAxis).scale(xScale(formatData));
  const yAxisGenerator = d3
    .axisLeft(yAxis)
    .scale(yScale(arrayOfTemperature(formatData)));

  useEffect(() => {
    d3.select(yAxis.current).call(yAxisGenerator);
    d3.select(xAxis.current).call(xAxisGenerator);

    const chart = d3
      .select(chartRef.current)
      .append("path")
      .datum(formatData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3.line(arrayOfTime(formatData), arrayOfTemperature(formatData))
      );
  });

  return (
    <div>
      <svg
        ref={chartRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g>
          <g ref={xAxis} transform={`translate (0, ${height + margin.top})`} />
          <g
            ref={yAxis}
            transform={`translate (${margin.right}, ${0 + margin.top})`}
          />
        </g>
      </svg>
    </div>
  );
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
