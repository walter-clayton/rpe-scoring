import { useState, useEffect, useRef } from "react";
import { dailyAverages, DailyAverage } from "../../lib/rpeStore";
import * as d3 from "d3";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Drawn in a fixed coordinate space and scaled to fit the screen, so the
// chart keeps its proportions from phone to desktop.
const WIDTH = 960;
const HEIGHT = 540;
const margin = { top: 70, right: 20, bottom: 60, left: 50 };

const dayLabel = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "short" });

const getLastSevenDays = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);
    days.push(date);
  }
  return days;
};

const RPEDashboard = () => {
  const [data, setData] = useState<DailyAverage[]>([]);
  const d3Container = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setData(dailyAverages());
  }, []);

  const lastSevenDays = getLastSevenDays();
  const recent = data.filter((d) => d._id >= lastSevenDays[0]);

  useEffect(() => {
    if (!d3Container.current || recent.length === 0) return;

    const width = WIDTH - margin.left - margin.right;
    const height = HEIGHT - margin.top - margin.bottom;
    const x = d3
      .scaleBand()
      .domain(lastSevenDays.map(dayLabel))
      .range([0, width])
      .padding(0.3);
    const y = d3.scaleLinear().domain([0, 10]).range([height, 0]);

    const svg = d3.select(d3Container.current);
    svg.selectAll("*").remove();
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call((axis) => axis.selectAll("path, line").attr("stroke", "#fff").attr("stroke-width", 2))
      .call((axis) =>
        axis.selectAll("text").attr("fill", "#fff").style("font-size", "28px").style("font-weight", "bold").attr("dy", "1.2em")
      );

    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0))
      .call((axis) => axis.selectAll("path, line").attr("stroke", "rgba(255,255,255,0.5)"))
      .call((axis) => axis.selectAll("text").attr("fill", "rgba(255,255,255,0.7)").style("font-size", "20px"));

    const barWidth = Math.min(x.bandwidth(), 90);
    recent.forEach((d) => {
      const cx = (x(dayLabel(d._id)) || 0) + x.bandwidth() / 2;
      const top = y(d.averageScore);
      g.append("rect")
        .attr("x", cx - barWidth / 2)
        .attr("y", top)
        .attr("width", barWidth)
        .attr("height", height - top)
        .attr("rx", 8)
        .attr("fill", d.color);
      g.append("text")
        .attr("x", cx)
        .attr("y", top - 14)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .style("font-size", "30px")
        .style("font-weight", "bold")
        .text(Math.round(d.averageScore * 10) / 10);
      g.append("text")
        .attr("x", cx)
        .attr("y", top - 52)
        .attr("text-anchor", "middle")
        .style("font-size", "44px")
        .text(d.emoji);
    });
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        boxSizing: "border-box",
        pt: { xs: 11, md: 13 },
        pb: 6,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Typography
        component="h1"
        align="center"
        sx={{ fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }, fontWeight: 300, lineHeight: 1.1 }}
      >
        RPE DASHBOARD
      </Typography>
      <Typography align="center" sx={{ mt: 1.5, mb: { xs: 3, md: 5 }, color: "rgba(255,255,255,0.7)" }}>
        Your average score per day, last 7 days
      </Typography>

      {recent.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography sx={{ mb: 3, color: "rgba(255,255,255,0.7)" }}>
            No scores yet. Scores are saved on this device only.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/RPEScore")}>
            Score a session
          </Button>
        </Box>
      ) : (
        <Box sx={{ width: "100%", maxWidth: 1000 }}>
          <svg
            ref={d3Container}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Average RPE score per day for the last 7 days"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default RPEDashboard;
