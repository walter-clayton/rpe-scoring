import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";
import { Grid, Typography, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface RPEData {
  _id: string;
  averageScore: number;
  color: string;
  emoji: string;
}

const RPEDashboard = () => {
  const [data, setData] = useState<RPEData[]>([]);
  const d3Container = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_RPEPOST_URL);

      if (response.data.rpeData) {
        const rpeDataWithDate = response.data.rpeData.map((d: RPEData) => ({
          ...d,
          _id: new Date(d._id),
        }));

        setData(rpeDataWithDate);
      } else {
        console.error("Error: response.data.rpeData is undefined");
      }
    } catch (error) {
      console.error("Error fetching RPE data:", error);
    }
  };

  const getLastSevenDays = () => {
    const lastSevenDays = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      lastSevenDays.push(date);
    }

    return lastSevenDays.reverse();
  };

  useEffect(() => {
    if (data.length > 0 && d3Container.current) {
      const svg = d3.select(d3Container.current);

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const lastSevenDays = getLastSevenDays();

      const x = d3
        .scaleBand()
        .domain(
          lastSevenDays.map((d) =>
            d.toLocaleDateString("en-US", { weekday: "long" }).slice(0, 3)
          )
        )
        .rangeRound([0, width])
        .padding(0.3);
      const y = d3.scaleLinear().domain([0, 15]).rangeRound([height, 0]);

      svg.selectAll("*").remove();

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("path")
        .style("stroke-width", 2.5);

      g.selectAll("text")
        .style("fill", "white")
        .style("font-size", "30px")
        .style("font-weight", "bold");

      for (let i = 0; i <= 15; i += 2) {
        g.append("line")
          .attr("x1", -80)
          .attr("y1", y(i))
          .attr("x2", 0)
          .attr("y2", y(i))
          .attr("stroke", "white")
          .attr("stroke-width", 2.5);
      }

      const lastSevenDaysData = data.filter(
        (d) => new Date(d._id) >= new Date(lastSevenDays[0])
      );

      lastSevenDaysData.forEach((d) => {
        const barWidth = 50;
        const barHeight = height - y(d.averageScore);

        g.append("rect")
          .attr("class", "bar")
          .attr(
            "x",
            (x(
              new Date(d._id)
                .toLocaleDateString("en-US", { weekday: "long" })
                .slice(0, 3)
            ) || 0) +
              x.bandwidth() / 2 -
              barWidth / 2
          )
          .attr("y", y(d.averageScore))
          .attr("width", barWidth)
          .attr("height", barHeight)
          .attr("fill", d.color)
          .attr("stroke-width", 2.5);

        g.append("text")
          .attr("class", "score")
          .attr(
            "x",
            (x(
              new Date(d._id)
                .toLocaleDateString("en-US", { weekday: "long" })
                .slice(0, 3)
            ) || 0) +
              x.bandwidth() / 2
          )
          .attr("y", y(d.averageScore) - 70)
          .attr("text-anchor", "middle")
          .attr("font-size", "20px")
          .attr("fill", "white")
          .text(Math.round(d.averageScore))
          .style("font-size", "30px")
          .style("font-weight", "bold");

        g.append("text")
          .attr("class", "emoji")
          .attr(
            "x",
            (x(
              new Date(d._id)
                .toLocaleDateString("en-US", { weekday: "long" })
                .slice(0, 3)
            ) || 0) +
              x.bandwidth() / 2
          )
          .attr("y", y(d.averageScore) + 20)
          .attr("text-anchor", "middle")
          .attr("font-size", "70px")
          .text(d.emoji);
      });
    }
  }, [data]);

  return (
    <Box
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        width: "100%",
        paddingTop: 10,
        margin: 0,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ flex: 1 }}
      >
        <Grid item xs={12}>
          <Typography
            variant={isSmallScreen ? "h3" : "h1"}
            align="center"
            gutterBottom
          >
            RPE DASHBOARD
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant={isSmallScreen ? "h5" : "h3"}
            align="center"
            gutterBottom
          >
            Last 7 days
          </Typography>
        </Grid>
        <Grid item sm={10}>
          <svg
            className="d3-component"
            width="100%"
            height="100%"
            viewBox="0 0 960 580"
            preserveAspectRatio="xMidYMid slice"
            ref={d3Container}
            style={{
              display: "block",
              margin: "0 auto",
              marginBottom: 0,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RPEDashboard;
