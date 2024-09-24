import {
  Box,
  Button,
  // Container,
  Divider,
  Grid,
  // ListItemSecondaryAction,
  // Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import StatBox from "../components/StatBox";

import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LandscapeIcon from "@mui/icons-material/Landscape";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterIcon from "@mui/icons-material/Water";
import WavesIcon from "@mui/icons-material/Waves";
import LandslideIcon from "@mui/icons-material/Landslide";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GaugeComponent from "react-gauge-component";
import BatteryGauge from "react-battery-gauge";
import Thermometer from "react-thermometer-component";

const Home = () => {
  useEffect(() => {
    getAllHardwares();
  }, []);

  const history = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stat, setStat] = useState([]);
  const [collections, setCollections] = useState([]);
  const [hwinfo, setHwinfo] = useState([]);

  const getAllHardwares = async () => {
    const response = await axios.get(`http://45.76.148.175:5000/hardwares`);
    console.log("response hardwares : ", response.data);
    setStat(response.data);
  };

  function formatedDate(date, timeZone = "UTC") {
    return new Date(date).toLocaleString("en-US", { timeZone });
    // return new Date(date).toLocaleTimeString();
  }

  const DataCollector = async (paramnya) => {
    console.log("jebret");
    const response = await axios.get(
      `http://45.76.148.175:5000/infodashboard/${paramnya}`
    );
    console.log("response collections : ", response.data.datawoy);
    setCollections(response.data.datawoy);
    setHwinfo(response.data.hardwarewoy);
  };

  useEffect(() => {
    if (stat.length > 0) {
      DataCollector(stat[0].kd_hardware);
    }
  }, [stat]);

  const containerStyle = {
    display: "flex",
    flexDirection: "column", // Adjust based on your layout requirements
    gap: "10px", // Space between items (optional)
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD "
          subtitle="Sistem Informasi Monitoring Hidrology"
        />
        <Box>
          {stat.map((listdata) => (
            <>
              &nbsp;{" "}
              <Button
                sx={{
                  backgroundColor: colors.greenAccent[800],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                onClick={() => {
                  DataCollector(listdata.kd_hardware);
                }}
              >
                {listdata.kd_hardware}
              </Button>
            </>
          ))}
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          // marginTop={5}
          gridColumn="span 12"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={colors.primary[400]}
          fontSize={20}
        >
          <Button
            variant="contained"
            color="warning"
            sx={{
              position: "absolute",
              top: 230, // Adjust as needed
              right: 30, // Adjust as needed
              fontSize: 15,
            }}
            onClick={() => {
              history(`/lihatdata/${hwinfo.kd_hardware}`);
            }}
          >
            <b>Lihat Data</b>
          </Button>
          {hwinfo !== null ? (
            // <>
            //   ID : <b>{hwinfo.kd_hardware}</b>, Nama Pos :
            //   <b>{hwinfo.pos_name}</b>, Lokasi : <b>{hwinfo.location}</b>
            // </>
            <>
              <b>{hwinfo.pos_name}</b>, Lokasi : <b>{hwinfo.location}</b>
            </>
          ) : (
            <> null </>
          )}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? (
                <>{collections.rainfall} mm</>
              ) : (
                <> null </>
              )
            }
            subtitle="Rainfall"
            progress="1"
            icon={
              <ThunderstormIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />

          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 7.5,
                  color: "#5BE12C",
                  showTick: true,
                  tooltip: {
                    text: "OK !",
                  },
                  // onClick: () =>
                  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  // onMouseMove: () =>
                  //   console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  // onMouseLeave: () =>
                  //   console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 15,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Warning !",
                  },
                },
                {
                  color: "#EA4228",
                  tooltip: {
                    text: "Danger !",
                  },
                },
              ],
            }}
            pointer={{
              // color: "#345243",
              color: "#F0FFFF",
              length: 0.8,
              width: 15,
              // elastic: true,
            }}
            labels={{
              valueLabel: {
                // Set this to false or customize
                formatTextValue: () => "", // Ensure the value text is empty
              },
            }}
            value={
              collections !== null && !isNaN(parseInt(collections.rainfall, 10))
                ? parseInt(collections.rainfall, 10)
                : 0
            }
            minValue={0}
            maxValue={50}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? (
                <>{collections.waterlevel} cm</>
              ) : (
                <> null </>
              )
            }
            subtitle="Water Level"
            progress="1"
            icon={
              <WavesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 15,
                  color: "#5BE12C",
                  showTick: true,
                  tooltip: {
                    text: "OK !",
                  },
                  // onClick: () =>
                  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  // onMouseMove: () =>
                  //   console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  // onMouseLeave: () =>
                  //   console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 20,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Warning !",
                  },
                },
                {
                  color: "#EA4228",
                  tooltip: {
                    text: "Danger !",
                  },
                },
              ],
            }}
            pointer={{
              // color: "#345243",
              color: "#F0FFFF",
              length: 0.8,
              width: 15,
              // elastic: true,
            }}
            labels={{
              valueLabel: {
                // Set this to false or customize
                formatTextValue: () => "", // Ensure the value text is empty
              },
            }}
            // value={parseInt(collections.waterlevel)}
            value={
              collections !== null &&
              !isNaN(parseInt(collections.waterlevel, 10))
                ? parseInt(collections.waterlevel, 10)
                : 0
            }
            minValue={0}
            maxValue={65}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? (
                <>{collections.debit} m&#179;/s</>
              ) : (
                <> null </>
              )
            }
            subtitle="Debit"
            progress="1"
            icon={
              <WaterIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 7.5,
                  color: "#5BE12C",
                  showTick: true,
                  tooltip: {
                    text: "OK !",
                  },
                },
                {
                  limit: 10,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Warning !",
                  },
                },
                {
                  color: "#EA4228",
                  tooltip: {
                    text: "Danger !",
                  },
                },
              ],
            }}
            pointer={{
              // color: "#345243",
              color: "#F0FFFF",
              length: 0.8,
              width: 15,
              // elastic: true,
            }}
            labels={{
              valueLabel: {
                // Set this to false or customize
                formatTextValue: () => "", // Ensure the value text is empty
              },
            }}
            // value={parseInt(collections.waterlevel)}
            value={
              collections !== null && !isNaN(parseInt(collections.debit, 10))
                ? parseInt(collections.debit, 10)
                : 0
            }
            minValue={0}
            maxValue={20}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? <>{collections.tss} mg/L</> : <> null </>
            }
            subtitle="TSS"
            progress="1"
            icon={
              <LandscapeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 200,
                  color: "#5BE12C",
                  showTick: true,
                  tooltip: {
                    text: "OK !",
                  },
                },
                {
                  limit: 300,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Warning !",
                  },
                },
                {
                  color: "#EA4228",
                  tooltip: {
                    text: "Danger !",
                  },
                },
              ],
            }}
            pointer={{
              color: "#F0FFFF",
              length: 0.8,
              width: 15,
            }}
            labels={{
              valueLabel: {
                formatTextValue: () => "", // Ensure the value text is empty
              },
            }}
            value={
              collections !== null && !isNaN(parseInt(collections.tss, 10))
                ? parseInt(collections.tss, 10)
                : 0
            }
            minValue={0}
            maxValue={400}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          // marginLeft={5}
        >
          <StatBox
            title={
              collections !== null ? (
                <>{collections.sedimentasi} mg/L</>
              ) : (
                <> null </>
              )
            }
            subtitle="Sedimentasi"
            progress="1"
            icon={
              <LandslideIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 200,
                  color: "#5BE12C",
                  showTick: true,
                  tooltip: {
                    text: "OK !",
                  },
                },
                {
                  limit: 300,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Warning !",
                  },
                },
                {
                  color: "#EA4228",
                  tooltip: {
                    text: "Danger !",
                  },
                },
              ],
            }}
            pointer={{
              // color: "#345243",
              color: "#F0FFFF",
              length: 0.8,
              width: 15,
              // elastic: true,
            }}
            labels={{
              valueLabel: {
                // Set this to false or customize
                formatTextValue: () => "", // Ensure the value text is empty
              },
            }}
            // value={parseInt(collections.waterlevel)}
            value={
              collections !== null && !isNaN(parseInt(collections.tss, 10))
                ? parseInt(collections.tss, 10)
                : 0
            }
            minValue={0}
            maxValue={400}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            // gridColumn="span 4"
            // gridRow="span 2"
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginLeft={5}
            marginRight={5}
          >
            <StatBox
              title={
                collections !== null ? (
                  <>{collections.battery} Volt</>
                ) : (
                  <> null </>
                )
              }
              subtitle="Battery"
              progress="1"
              icon={
                <BatteryCharging50Icon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                    transform: "rotate(90deg)",
                  }}
                />
              }
            />
            <StatBox
              title={
                collections !== null ? (
                  <>{collections.device_temp} &deg;C</>
                ) : (
                  <> null </>
                )
              }
              subtitle="Device Temperature"
              progress="1"
              icon={
                <ThermostatIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                    transform: "rotate(90deg)",
                  }}
                />
              }
            />
          </Box>

          <Thermometer
            theme="light"
            value={
              collections !== null &&
              !isNaN(parseInt(collections.device_temp, 10))
                ? parseInt(collections.device_temp, 10)
                : 0
            }
            max="100"
            // steps="3"
            format="°C"
            size="large"
            height="200"
          />
          <BatteryGauge
            value={
              collections !== null && !isNaN(parseInt(collections.battery, 10))
                ? (parseInt(collections.battery, 10) / 13) * 100
                : 0
            }
            orientation={"vertical"}
            customization={{
              batteryBody: {
                fill: "white",
                strokeColor: "white",
                strokeWidth: 2,
              },
              batteryCap: {
                capToBodyRatio: 0.4,
                cornerRadius: 3,
                fill: "silver",
                strokeColor: "silver",
                strokeWidth: 0,
              },
              batteryMeter: {
                gradFill: [
                  {
                    color: "red",
                    offset: 0,
                  },
                  {
                    color: "orange",
                    offset: 15,
                  },
                  {
                    color: "green",
                    offset: 90,
                  },
                ],
                outerGap: 0,
              },
              readingText: {
                darkContrastColor: "yellow",
                fontFamily: "Arial",
                fontSize: 12,
                lightContrastColor: "black",
                lowBatteryColor: "red",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
