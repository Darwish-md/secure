import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Heatmap = () => {
  const ref = useRef(null);

  useEffect(() => {
    const  data = [
        { name: "cand1", votes: 5 },
        { name: "cand2", votes: 7 },
        { name: "cand3", votes: 2 },
      ];

    const margin = { top: 50, right: 0, bottom: 100, left: 30 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.name))
      .padding(0.1);

    const yScale = d3.scaleBand()
      .range([0, height])
      .domain(d3.range(1, 11)) // assuming there are 10 candidates
      .padding(0.1);

    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([0, d3.max(data, d => d.votes)]);

    svg.selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.name))
      .attr("y", d => yScale(d3.range(1, 11).find(i => d.votes <= i)))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .style("fill", d => colorScale(d.votes));

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d => d3.format("d")(d + 1)));

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .text("Candidates Heatmap");

  }, []);

  return <svg ref={ref}></svg>;
};

export default Heatmap;