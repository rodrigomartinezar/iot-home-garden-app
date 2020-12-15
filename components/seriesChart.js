import { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../styles/Home.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
} from "recharts";

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
  const { formatData, variableToPlot } = props;

  let dataToPlot;

  if (variableToPlot === "temperatura") {
    dataToPlot = arrayOfObjects(
      arrayOfTime(formatData),
      arrayOfTemperature(formatData)
    );
  }

  if (variableToPlot === "humedad") {
    dataToPlot = arrayOfObjects(
      arrayOfTime(formatData),
      arrayOfHumidity(formatData)
    );
  }

  return (
    <div>
      {variableToPlot === "temperatura" && <h2>Temperatura</h2>}
      {variableToPlot === "humedad" && <h2>Humedad</h2>}
      <LineChart width={width} height={height} data={dataToPlot}>
        <XAxis dataKey="timestamp" />
        {variableToPlot === "temperatura" && <YAxis unit="°C" />}
        {variableToPlot === "humedad" && <YAxis unit="%" />}
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        {variableToPlot === "temperatura" && (
          <Line type="basis" dataKey="value" stroke="#8884d8" dot={false} />
        )}
        {variableToPlot === "humedad" && (
          <Line type="basis" dataKey="value" stroke="#f50057" dot={false} />
        )}
        {variableToPlot === "temperatura" && (
          <ReferenceArea y1={20} y2={28} stroke="red" strokeOpacity={0.3} />
        )}
        {variableToPlot === "temperatura" && (
          <ReferenceArea y1={0} y2={8} stroke="red" strokeOpacity={0.3} />
        )}
        {variableToPlot === "humedad" && (
          <ReferenceArea y1={80} y2={100} stroke="red" strokeOpacity={0.3} />
        )}
        {variableToPlot === "humedad" && (
          <ReferenceArea y1={0} y2={30} stroke="red" strokeOpacity={0.3} />
        )}
      </LineChart>
    </div>
  );
};

export default SeriesChart;
