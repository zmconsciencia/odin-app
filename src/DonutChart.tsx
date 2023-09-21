import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DonutChartProps {
  data: { name: string; value: number }[];
  width: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, width }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const height = Math.min(500, 500);
    const radius = Math.min(width/2, height) / 2;

    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius - 1);

    const pie = d3.pie<{ name: string; value: number }>()
        .sort((a, b) => a.name.localeCompare(b.name))
        .value(d => d.value);
    
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateYlOrRd(t * 0.5 + 0.3), data.length).reverse());

    const totalValue = data.reduce((sum, d) => sum + d.value, 0);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    const outerArc = d3.arc()
      .innerRadius(radius * 1.28)
      .outerRadius(radius * 1.28);

    svg.append("g")
      .attr("font-family", "Inter, sans-serif")
      .attr("font-size", 30)
      .attr("fill", "#2D3748")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(data))
      .join("text")
      .attr("transform", d => `translate(${outerArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7));
    
    svg.append("text")
        .attr("font-family", "Inter, sans-serif")
        .attr("text-anchor", "middle")
        .attr("font-size", 80)
        .attr("fill", "#2D3748")
        .attr("dy", "0.35em")
        .text(`${totalValue.toLocaleString("en-US")}`);
  }, [data, width]);

  return <svg ref={svgRef}></svg>;
};

export default DonutChart;