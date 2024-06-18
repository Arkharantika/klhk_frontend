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
    const response = await axios.get(`http://localhost:5000/hardwares`);
    console.log("response hardwares : ", response.data);
    setStat(response.data);
  };

  function formatedDate(date) {
    return new Date(date).toLocaleTimeString();
  }

  const DataCollector = async (paramnya) => {
    console.log("jebret");
    const response = await axios.get(
      `http://localhost:5000/infodashboard/${paramnya}`
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

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
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
          marginTop={10}
          gridColumn="span 12"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={colors.primary[400]}
          fontSize={20}
        >
          {hwinfo !== null ? (
            <>
              ID : <b>{hwinfo.kd_hardware}</b>, Nama Pos :
              <b>{hwinfo.pos_name}</b>, Lokasi : <b>{hwinfo.location}</b>
            </>
          ) : (
            <> null </>
          )}
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? <>{collections.battery}</> : <> null </>
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
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? (
                <>{collections.device_temp}</>
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
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={collections !== null ? <>{collections.tss}</> : <> null </>}
            subtitle="TSS"
            progress="1"
            icon={
              <LandscapeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? <>{collections.rainfall}</> : <> null </>
            }
            subtitle="Rainfall"
            progress="1"
            icon={
              <ThunderstormIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? <>{collections.waterlevel}</> : <> null </>
            }
            subtitle="Water Level"
            progress="1"
            icon={
              <WavesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? <>{collections.debit}</> : <> null </>
            }
            subtitle="Debit"
            progress="1"
            icon={
              <WaterIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? (
                <>{collections.sedimentasi}</>
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
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              collections !== null ? (
                <>{formatedDate(collections.tlocal)}</>
              ) : (
                <> null </>
              )
            }
            subtitle="Last Update"
            progress="1"
            icon={
              <AccessTimeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          padding={3}
        >
          <Divider></Divider>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>Rumus Sedimentasi </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>
                : <b>Qsi = K.Csi.Qi / CA </b>
              </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>Nilai Csi </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>
                : <b>tss saat ini</b>
              </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>Catch Area (CA) </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>
                : <b>{hwinfo.sed_catchment_area}</b>
              </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>Longitude </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>
                : <b>{hwinfo.longitude}</b>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>Faktor Konversi</div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>
                : <b>{hwinfo.sed_conversion}</b>
              </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>Nilai Qi </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>
                : <b>debit saat ini</b>
              </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>Latitude </div>
            </Grid>
            <Grid item xs={1} md={1.5}>
              <div style={{ fontSize: "18px" }}>
                : <b>{hwinfo.latitude}</b>
              </div>
            </Grid>
            <Grid item xs={1} md={1.5}></Grid>
            <Grid item xs={1} md={1.5}>
              <Button
                sx={{
                  backgroundColor: colors.redAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  margin: "1px",
                }}
                onClick={() => {
                  history(`/lihatdata/${hwinfo.kd_hardware}`);
                }}
              >
                Lihat detail pos
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
