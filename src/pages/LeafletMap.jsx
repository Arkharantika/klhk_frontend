import "./MapStyle.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "leaflet";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const LeafletMap = () => {
  const [listhardware, setListhardware] = useState([]);
  const [tempData, setTempData] = useState([]);
  // const [muncul, setMuncul] = useState(null);
  const markerRefs = useRef({});
  const history = useNavigate();

  useEffect(() => {
    getHardwares();
  }, []);

  const customIcon = new Icon({
    iconUrl: "./location.png",
    iconSize: [35, 35],
  });

  const getHardwares = async () => {
    const response = await axios.get("http://localhost:5000/hardwares");
    console.log(response.data);
    setListhardware(response.data);
  };

  const getLastData = async (param) => {
    console.log("kd_hardwarenya : ", param);
    const response = await axios.get(
      `http://localhost:5000/latestdata/${param}`
    );
    console.log("latest data : ", response);
    setTempData(response.data);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                history("/");
              }}
            >
              {/* <MenuIcon /> */}
              <ArrowBackIosIcon />
              <Typography> Back </Typography>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              align="center"
            >
              PETA POS HARDWARE SISTEM MONITORING KEMENTRIAN LINGKUNGAN HIDUP
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <MapContainer center={[-7.55, 110.43]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listhardware.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={customIcon}
            ref={(ref) => {
              markerRefs.current[marker.id] = ref;
            }}
            eventHandlers={{
              mouseover: () => {
                // setMuncul(marker.id);
                getLastData(marker.kd_hardware);
                markerRefs.current[marker.id].openPopup();
              },
              mouseout: () => {
                // setMuncul(null);
                markerRefs.current[marker.id].closePopup();
              },
            }}
          >
            <Popup>
              {tempData !== null ? (
                <>
                  ID : {tempData.kd_hardware} <br />
                  battery : {tempData.battery} <br />
                  rainfall : {tempData.rainfall} <br />
                  waterlevel : {tempData.waterlevel} <br />
                  device temperature : {tempData.device_temp} <br />
                  tss : {tempData.tss} <br />
                  debit : {tempData.debit}
                </>
              ) : (
                <>tidak ada data</>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
