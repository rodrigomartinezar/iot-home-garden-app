import { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../styles/Home.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const formatKelvin = (kelvinT) => kelvinT - 273.15;

const charsToReplace = {
  T: " ",
  Z: "",
};

const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const width = 1000 - margin.left - margin.right;
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

const arrayOfObjects = (array1, array2) => {
  return array1.map((element, index) => {
    let resultingObject = {};
    resultingObject["timestamp"] = element;
    resultingObject["value"] = array2[index];
    return resultingObject;
  });
};

const xScale = (data) =>
  d3
    .scaleTime()
    .domain([d3.min(arrayOfTime(data)), d3.max(arrayOfTime(data))])
    .range([0, width]);

const yScale = (data) =>
  d3
    .scaleLinear()
    .domain([0, Math.max(...data)])
    .range([height, 0]);

const SeriesChart = (props) => {
  const { formatData } = props;

  const dataToPlot = arrayOfObjects(
    arrayOfTime(formatData),
    arrayOfTemperature(formatData)
  );

  /* const x = d3
    .scaleTime()
    .domain([d3.min(arrayOfTime(formatData)), d3.max(arrayOfTime(formatData))])
    .range([0, width]);
  const y = d3
    .scaleLinear()
    .domain([0, Math.max(arrayOfTemperature(formatData))])
    .range([height, 0]);

  const xAxis = useRef();
  const yAxis = useRef();
  const chartRef = useRef();

  const xAxisGenerator = d3
    .axisBottom(xAxis)
    .scale(xScale(formatData))
    .tickFormat(d3.timeFormat("%m-%d %H:%M"));
  const yAxisGenerator = d3
    .axisLeft(yAxis)
    .scale(yScale(arrayOfTemperature(formatData)));

  useEffect(() => {
    d3.select(yAxis.current).call(yAxisGenerator);
    d3.select(xAxis.current).call(xAxisGenerator);

    d3.select(chartRef.current)
      .append("path")
      .datum(dataToPlot)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.timestamp);
          })
          .y(function (d) {
            return y(d.value);
          })
      );
  }); */

  return (
    <div>
      {/* <svg
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
      </svg> */}
      <LineChart width={width} height={height} data={dataToPlot}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default SeriesChart;
