import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import LineChart2 from "../components/LineChart2";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DataTelemetry = () => {
  const { id } = useParams();
  const [posname, setPosname] = useState("");
  const [nopos, setNopos] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [stat, setStat] = useState([]);
  const [startDate, setStartDate] = useState("kentang");
  const [endDate, setEndDate] = useState("kentang");
  const [fotonya, setFotonya] = useState("");
  const [selectedOption, setSelectedOption] = useState("battery"); // Set a default value
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const transformedData = selectedOption
    ? [
        {
          id: selectedOption,
          color: tokens("dark").greenAccent[500],
          data: stat.map((item) => ({
            x: new Date(item.tlocal).toLocaleTimeString(),
            y: item[selectedOption],
          })),
        },
      ]
    : [];

  function formatedDate(date) {
    return new Date(date).toLocaleString();
  }

  const columns = [
    {
      field: "tlocal",
      headerName: "Tanggal",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {formatedDate(params.row.tlocal)}
        </Typography>
      ),
    },
    {
      field: "waterlevel",
      headerName: "Water Level",
      flex: 1,
    },
    {
      field: "debit",
      headerName: "Debit",
      flex: 1,
    },
    {
      field: "rainfall",
      headerName: "Rainfall",
      flex: 1,
    },
    {
      field: "device_temp",
      headerName: "Device Temperature",
      flex: 1,
    },
    {
      field: "tss",
      headerName: "TSS",
      flex: 1,
    },
    {
      field: "battery",
      headerName: "Battery",
      flex: 1,
    },
    {
      field: "sedimentasi",
      headerName: "sedimentasi",
      flex: 1,
    },
  ];

  useEffect(() => {
    getSpecificData();
  }, []);

  useEffect(() => {
    console.log("Selected Option changed:", selectedOption);
    if (stat.length > 0) {
      console.log("Stat data available:", stat);
    }
  }, [selectedOption, stat]);

  const getSpecificData = async () => {
    const response = await axios.get(`http://localhost:5000/hardware/${id}`);
    console.log(response);
    setPosname(response.data.pos_name);
    setLat(response.data.latitude);
    setLong(response.data.longitude);
    setLocation(response.data.location);
    setCondition(response.data.condition);
    setNopos(response.data.no_pos);
    setFotonya("http://localhost:5000/images/" + response.data.foto_pos);
  };

  const getAlldataList = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/hardware/${id}`,
        {
          startDate: startDate,
          endDate: endDate,
        }
      );
      setStat(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
    console.log("transformedData", transformedData);
  };

  const downloadExcel = async (req, res) => {
    if (startDate && endDate !== "kentang") {
      console.log("ada stardate maupun enddate");
      console.log("datanya : ", startDate, endDate);
      try {
        const response = await axios.post(
          `http://localhost:5000/exportexcel/${id}`,
          {
            startDate: startDate,
            endDate: endDate,
          },
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "output.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("tidak ada stardate dan enddate");
      console.log("datanya : ", startDate, endDate);
    }
  };

  return (
    <Box m="18px">
      <Header
        title="DATA TELEMETRY"
        subtitle="Informasi statistik dan data telemetry"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: colors.blueAccent[100],
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <br />
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="18px"
        >
          <Box
            gridColumn="span 2"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
            component="img"
            src={fotonya}
            maxHeight={300}
          ></Box>
          <Box
            gridColumn="span 10"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Container sx={{ paddingTop: 2 }}>
              <Typography
                variant="h2"
                fontWeight="600"
                color={colors.grey[100]}
              >
                {posname}
              </Typography>
              <Divider></Divider>
              <br />
              <Grid container spacing={1}>
                <Grid item xs={6} md={1.5}>
                  <div style={{ fontSize: "18px" }}>ID Hardware</div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={{ fontSize: "18px" }}>: {id}</div>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} md={1.5}>
                  <div style={{ fontSize: "18px" }}>No. POS</div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={{ fontSize: "18px" }}>: {nopos}</div>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} md={1.5}>
                  <div style={{ fontSize: "18px" }}>Lokasi </div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={{ fontSize: "18px" }}>: {location}</div>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} md={1.5}>
                  <div style={{ fontSize: "18px" }}>Latitude </div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={{ fontSize: "18px" }}>: {lat}</div>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} md={1.5}>
                  <div style={{ fontSize: "18px" }}>Longitude </div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={{ fontSize: "18px" }}>: {long}</div>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} md={1.5}>
                  <div style={{ fontSize: "18px" }}>Elevasi </div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={{ fontSize: "18px" }}>: 62,8 {"\u00b0"}</div>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} md={1.5}>
                  <div style={{ fontSize: "18px" }}>Status Logger </div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <div style={{ fontSize: "18px" }}>
                    : {condition === 1 ? "Aktif" : "Non - aktif"}
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Highlight Grafik
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  ID Hardware : {id}
                </Typography>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedOption}
                    label="Sensor"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="waterlevel">waterlevel</MenuItem>
                    <MenuItem value="rainfall">rainfall</MenuItem>
                    <MenuItem value="tss">tss</MenuItem>
                    <MenuItem value="debit">debit</MenuItem>
                    <MenuItem value="battery">battery</MenuItem>
                    <MenuItem value="device_temp">device temperature</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box height="250px" m="-30px 0 00 30px">
              {selectedOption && stat.length > 0 && (
                <LineChart2 isDashboard={true} extraData={transformedData} />
              )}
            </Box>
          </Box>

          <Box
            gridColumn="span 12"
            gridRow=""
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            paddingLeft="20px"
            gap="20px"
          >
            <form className="d-flex" onSubmit={getAlldataList}>
              <div className="form-group mt-1">
                <label>Tanggal Mulai</label>
                <input
                  type="datetime-local"
                  step="1"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mx-sm-3 mb-2 mt-1">
                <label>Tanggal Akhir</label>
                <input
                  type="datetime-local"
                  step="1"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mx-sm-3 mb-2 mt-1">
                <label></label>
                <button
                  type="submit"
                  className="form-control bg-primary text-white"
                >
                  Lihat Data
                </button>
              </div>
              <div className="form-group mx-sm-3 mb-2 mt-1">
                <Button
                  className="form-control bg-success text-white"
                  sx={{ marginTop: "20px" }}
                  onClick={() => {
                    downloadExcel();
                  }}
                >
                  Download Laporan Tahunan
                </Button>
              </div>
            </form>
          </Box>
        </Box>
        <br />
        <DataGrid
          checkboxSelection
          rows={stat}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DataTelemetry;
