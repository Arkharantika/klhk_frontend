import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useTheme } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ManagementPos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let [hardwares, setHardwares] = useState([]);

  // const [name, setName] = useState("");
  // const [token, setToken] = useState("");
  // const [expire, setExpire] = useState("");
  const [role, setRole] = useState("");
  const history = useNavigate();

  useEffect(() => {
    getHardwares();
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      // setToken(response.data.newAccessToken);
      const decoded = jwtDecode(response.data.newAccessToken);
      console.log(decoded);
      // setName(decoded.name);
      setRole(decoded.role);
      // setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history("/login");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "kd_hardware", headerName: "Hardware ID", flex: 1 },
    {
      field: "location",
      headerName: "Lokasi",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "longitude",
      headerName: "Longitude",
      flex: 1,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      flex: 1,
    },
    {
      field: "tsample",
      headerName: "Interval",
      flex: 1,
    },
    {
      field: "condition",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const status = params.value === 1 ? "active" : "non-active";
        return <span>{status}</span>;
      },
    },
    {
      field: "action",
      headerName: "action",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <div className="action">
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                history(`/lihatdata/${params.row.kd_hardware}`);
              }}
            >
              Lihat
            </Button>
            {role === "admin" && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    history(`/editpos/${params.row.kd_hardware}`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.confirm(
                      "Apakah anda yakin untuk menghapus data ini ?"
                    );
                  }}
                >
                  Hapus
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const getHardwares = async () => {
    const response = await axios.get("http://localhost:5000/hardwares");
    console.log(response.data);
    setHardwares(response.data);
  };

  return (
    <Box m="20px">
      <Header
        title="LIST POS HARDWARE"
        subtitle="List pos hardware dan privilege management (khusus admin)"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={hardwares}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ManagementPos;
