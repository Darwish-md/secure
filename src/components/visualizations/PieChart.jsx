import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = () => {
  const data = [
    { name: "cand1", votes: 5 },
    { name: "cand2", votes: 15 },
    { name: "cand3", votes: 30 },
  ];

  return (
    <div style={{ height: "80vh", width: "50vw", color:"white" }}>
      <ResponsivePie
        data={data}
        id="name"
        value="votes"
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "set1" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={({ id, value }) => (
          <strong>
            {id}: {value}
          </strong>
        )}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "white",
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                  itemBackground: "rgb(153 0 1 / 50%)",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
