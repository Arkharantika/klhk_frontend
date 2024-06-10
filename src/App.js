import { Routes, Route } from "react-router-dom";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Login from "./pages/Login";
import Wrapper from "./components/Wrapper";
import Statistik from "./pages/Statistik";
import Home from "./pages/Home";
import Users from "./pages/Users";
import ManagementPos from "./pages/ManagementPos";
import DataTelemetry from "./pages/DataTelemetry";
import EditPos from "./pages/EditPos";
import LeafletMap from "./pages/LeafletMap";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="map" element={<LeafletMap />} />
        <Route
          path="/"
          element={
            <Wrapper>
              <Home />
              {/* <Dashboard /> */}
            </Wrapper>
          }
        />
        <Route
          path="/editpos/:id"
          element={
            <Wrapper>
              <EditPos />
            </Wrapper>
          }
        />
        <Route
          path="/team"
          element={
            <Wrapper>
              <Team />
            </Wrapper>
          }
        />
        <Route
          path="/contacts"
          element={
            <Wrapper>
              <Contacts />
            </Wrapper>
          }
        />
        <Route
          path="/invoices"
          element={
            <Wrapper>
              <Invoices />
            </Wrapper>
          }
        />
        <Route
          path="/form"
          element={
            <Wrapper>
              <Form />
            </Wrapper>
          }
        />
        <Route
          path="/bar"
          element={
            <Wrapper>
              <Bar />
            </Wrapper>
          }
        />
        <Route
          path="/pie"
          element={
            <Wrapper>
              <Pie />
            </Wrapper>
          }
        />
        <Route
          path="/line"
          element={
            <Wrapper>
              <Line />
            </Wrapper>
          }
        />
        <Route
          path="/faq"
          element={
            <Wrapper>
              <FAQ />
            </Wrapper>
          }
        />
        <Route
          path="/calendar"
          element={
            <Wrapper>
              <Calendar />
            </Wrapper>
          }
        />
        <Route
          path="/geography"
          element={
            <Wrapper>
              <Geography />
            </Wrapper>
          }
        />
        <Route
          path="/statistik"
          element={
            <Wrapper>
              <Statistik />
            </Wrapper>
          }
        />
        <Route
          path="/home"
          element={
            <Wrapper>
              <Home />
            </Wrapper>
          }
        />
        <Route
          path="/users"
          element={
            <Wrapper>
              <Users />
            </Wrapper>
          }
        />
        <Route
          path="/posmanagement"
          element={
            <Wrapper>
              <ManagementPos />
            </Wrapper>
          }
        />
        <Route
          path="/datatelemetry"
          element={
            <Wrapper>
              <DataTelemetry />
            </Wrapper>
          }
        />
        <Route
          path="/lihatdata/:id"
          element={
            <Wrapper>
              <DataTelemetry />
            </Wrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
