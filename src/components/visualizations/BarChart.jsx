import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({candidates}) => {
  const data = candidates;

  return (
    <div style={{ height: "80vh", width: "30vw", fill:"white" }}>
      <ResponsiveBar
        data={data}
        keys={["votes"]}
        indexBy="name"
        margin={{ top: 50, right: 30, bottom: 100, left: 60 }}
        padding={0.2}
        colors={{ scheme: "accent" }}
        colorBy="id"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "Candidate",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Votes",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default BarChart;
