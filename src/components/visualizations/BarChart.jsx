import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const ref = useRef(null);

  useEffect(() => {
    const  data = [
        { name: "cand1", votes: 5 },
        { name: "cand2", votes: 7 },
        { name: "cand3", votes: 80 },
      ];

    const margin = { top: 50, right: 30, bottom: 100, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, d => d.votes)]);

    svg.selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.name))
      .attr("y", d => yScale(d.votes))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.votes))
      .style("fill", "steelblue");

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("y", 10)
      .attr("x", -5)
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-45)");

    svg.append("g")
      .call(d3.axisLeft(yScale));

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .text("Candidates Bar Chart");

  }, []);

  return <svg ref={ref}></svg>;
};

export default BarChart;