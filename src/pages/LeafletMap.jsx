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
              // mouseout: () => {
              //   // setMuncul(null);
              //   markerRefs.current[marker.id].closePopup();
              // },
            }}
          >
            <Popup className="custom-popup">
              {tempData !== null ? (
                <>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>ID </td>
                        <td>{tempData.kd_hardware}</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Battery</td>
                        <td>{tempData.battery} </td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Rainfall</td>
                        <td>{tempData.rainfall} </td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Waterlevel</td>
                        <td>{tempData.waterlevel} </td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>Device Temp.</td>
                        <td>{tempData.device_temp} </td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>TSS</td>
                        <td>{tempData.tss} </td>
                      </tr>
                      <tr>
                        <th scope="row">7</th>
                        <td>Debit</td>
                        <td>{tempData.debit} </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center">
                    <button className="btn btn-sm btn-success">
                      Lihat Pos
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Tidak Ada Data !</th>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
