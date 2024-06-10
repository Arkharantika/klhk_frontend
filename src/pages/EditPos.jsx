import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditPos = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pos_name, setPos_name] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [no_gsm, setNo_gsm] = useState("");
  const [kd_provinsi, setKd_provinsi] = useState("");
  const [kd_kabupaten, setKd_kabupaten] = useState("");
  const [kd_kecamatan, setKd_kecamatan] = useState("");
  const [kd_desa, setKd_desa] = useState("");
  const [no_pos, setNo_pos] = useState("");
  const [elevasi, setElevasi] = useState("");
  const [sed_conversion, setSed_conversion] = useState("");
  const [sed_cachment_area, setSed_cachment_area] = useState("");
  // const [condition, setCondition] = useState("");
  const [k1, setK1] = useState("");
  const [k2, setK2] = useState("");
  const [k3, setK3] = useState("");
  const [k_tma, setK_tma] = useState("");
  const [file, setFile] = useState("");
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    getSpecificData();
  }, []);

  const getSpecificData = async () => {
    const response = await axios.get(`http://localhost:5000/hardware/${id}`);
    console.log("response cuy :", response);
    setPos_name(response.data.pos_name);
    setLatitude(response.data.latitude);
    setlongitude(response.data.longitude);
    setLocation(response.data.location);
    // setCondition(response.data.condition);
    setK_tma(response.data.k_tma);
    setNo_gsm(response.data.k_tma);
    setKd_provinsi(response.data.k_tma);
    setKd_kabupaten(response.data.k_tma);
    setKd_kecamatan(response.data.k_tma);
    setKd_desa(response.data.k_tma);
    setNo_pos(response.data.k_tma);
    setElevasi(response.data.k_tma);
    setK1(response.data.k_tma);
    setK2(response.data.k_tma);
    setK3(response.data.k_tma);
    setK_tma(response.data.k_tma);
    setSed_cachment_area(response.data.sed_catchment_area);
    setSed_conversion(response.data.sed_conversion);
  };

  const updateHardware = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pos_name", pos_name);
    formData.append("location", location);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("no_gsm", no_gsm);
    formData.append("kd_provinsi", kd_provinsi);
    formData.append("kd_kabupaten", kd_kabupaten);
    formData.append("kd_kecamatan", kd_kecamatan);
    formData.append("kd_desa", kd_desa);
    formData.append("no_pos", no_pos);
    formData.append("elevasi", elevasi);
    formData.append("k1", k1);
    formData.append("k2", k2);
    formData.append("k3", k3);
    formData.append("k_tma", k_tma);
    formData.append("sed_catchment_area", sed_cachment_area);
    formData.append("sed_conversion", sed_conversion);
    try {
      await axios.post(`http://localhost:5000/updatehardware/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Update Berhasil!",
      });
      history("/posmanagement");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="EDIT POS" subtitle="Edit Data Pos Hardware" />

      <Formik>
        <form onSubmit={updateHardware}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              disabled
              variant="filled"
              type="text"
              label="ID Hardware"
              value={id}
              name="kd_hardware"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Pos Name"
              value={pos_name}
              name="pos_name"
              onChange={(e) => setPos_name(e.target.value)}
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              name="location"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              name="latitude"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Longitude"
              value={longitude}
              onChange={(e) => setlongitude(e.target.value)}
              name="longitude"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Nomor GSM"
              value={no_gsm}
              onChange={(e) => setNo_gsm(e.target.value)}
              name="no_gsm"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Provinsi"
              value={kd_provinsi}
              onChange={(e) => setKd_provinsi(e.target.value)}
              name="kd_provinsi"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Kabupaten"
              value={kd_kabupaten}
              onChange={(e) => setKd_kabupaten(e.target.value)}
              name="kd_kabupaten"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Kecamatan"
              value={kd_kecamatan}
              onChange={(e) => setKd_kecamatan(e.target.value)}
              name="kd_kecamatan"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Desa"
              value={kd_desa}
              onChange={(e) => setKd_desa(e.target.value)}
              name="kd_desa"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Nomor Pos"
              value={no_pos}
              onChange={(e) => setNo_pos(e.target.value)}
              name="no_pos"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Elevasi"
              value={elevasi}
              onChange={(e) => setElevasi(e.target.value)}
              name="elevasi"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Konstanta a"
              value={k1}
              onChange={(e) => setK1(e.target.value)}
              name="k1"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Konstanta b"
              value={k2}
              onChange={(e) => setK2(e.target.value)}
              name="k2"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Konstanta c"
              value={k3}
              onChange={(e) => setK3(e.target.value)}
              name="k3"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Konstanta TMA"
              value={k_tma}
              onChange={(e) => setK_tma(e.target.value)}
              name="k_tma"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Faktor Konversi"
              value={sed_conversion}
              onChange={(e) => setSed_conversion(e.target.value)}
              name="sed_conversion"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Catchment Area"
              value={sed_cachment_area}
              onChange={(e) => setSed_cachment_area(e.target.value)}
              name="sed_cachment_area"
              sx={{ gridColumn: "span 2" }}
              required
            />
            <input
              fullWidth
              variant="filled"
              type="file"
              label="Foto POS"
              onChange={(e) => setFile(e.target.files[0])}
              name="file"
              sx={{ gridColumn: "span 2" }}
              required
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Simpan dan Update
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
};

export default EditPos;
