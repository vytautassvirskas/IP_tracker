import { useEffect, useState } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DataSheet from "./components/DataSheet";
import InputWithButton from "./components/InputWithButton";
import { Title } from "./components/Title";
import { GlobalStyle } from "./GlobalStyles.styles";
import DekstopBackkgroundImg from "./assets/images/pattern-bg-desktop.png";
import MarkerPlace from "./components/MarkerPlace";

const AppDiv = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 50px;
  background: url(${DekstopBackkgroundImg}) no-repeat top;
  background-size: contain;
`;

export interface MyIpAdressData {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
  latitude: number;
  longitude: number;
}

function App() {
  const [ipAdress, setIpAdress] = useState<MyIpAdressData>({
    ip: "",
    location: "",
    timezone: "",
    isp: "",
    latitude: 51.505,
    longitude: -0.09,
  });
  useEffect(() => {
    const API_KEY = "at_9XzGo7SAsjTuAyOTTgDwnDgR7LmcB";
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress`;

    const getAdress = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const location = data.location;
        setIpAdress({
          ...ipAdress,
          ip: data.ip,
          location: `${location.city}${
            location.region && `, ${location.region}`
          }${location.postalCode && `, ${location.postalCode}`}`,
          timezone: `UTC ${location.timezone}`,
          isp: data.isp,
          latitude: location.lat,
          longitude: location.lng,
        });
        console.log("response: ", data);
      } catch (error) {
        console.log(error);
      }
    };

    getAdress();
  }, []);

  useEffect(() => {
    console.log("useEffect ~ ipAdress:", ipAdress);
  }, [ipAdress]);

  return (
    <>
      <GlobalStyle />
      <AppDiv>
        <Title>IP Address Tracker</Title>
        <InputWithButton />
        <DataSheet ipAdress={ipAdress}></DataSheet>
        <MapContainer
          center={[ipAdress.latitude, ipAdress.longitude]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "900px", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPlace ipAdress={ipAdress}></MarkerPlace>
        </MapContainer>
      </AppDiv>
    </>
  );
}

export default App;
