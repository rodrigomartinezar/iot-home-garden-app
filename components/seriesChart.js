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

const SeriesChart = (props) => {
  const { formatData } = props;

  const dataToPlot = arrayOfObjects(
    arrayOfTime(formatData),
    arrayOfTemperature(formatData)
  );

  return (
    <div>
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
