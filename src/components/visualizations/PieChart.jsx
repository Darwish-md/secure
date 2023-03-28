import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = [
      { name: "cand1", votes: 5 },
      { name: "cand2", votes: 15 },
      { name: "cand3", votes: 30 },
    ];
    const width = 400;
    const height = 400;

    if (data && svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Define dimensions and radius
      const radius = Math.min(width, height) / 2;
      const margin = { top: 0, right: 0, bottom: 0, left: 0 };
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Set up the pie chart
      const pie = d3.pie().value((d) => d.votes);
      const dataReady = pie(data);

      // Define color scale
      const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.name))
        .range(d3.schemeCategory10);

      // Draw the pie chart
      const arcs = svg
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2})`)
        .selectAll("path")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
        .attr("fill", (d) => color(d.data.name))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1);

      // Add labels
      svg
        .selectAll("text")
        .data(dataReady)
        .enter()
        .append("text")
        .text((d) => `${d.data.name} (${d.data.votes})`)
        .attr("transform", (d) => `translate(${d3.arc().centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "14px");
    }
  }, []);

  return <svg className="m-auto" ref={svgRef}></svg>;
};

export default PieChart;