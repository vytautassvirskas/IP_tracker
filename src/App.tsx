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

export interface AddressData {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
  latitude: number;
  longitude: number;
}

function App() {
  const [address, setAddress] = useState<AddressData>({
    ip: "",
    location: "",
    timezone: "",
    isp: "",
    latitude: 51.505,
    longitude: -0.09,
  });
  const [ipAddress, setIpAddress] = useState<string>("");
  useEffect(() => {
    const getAddress = async (): Promise<void> => {
      try {
        const API_KEY = "at_9XzGo7SAsjTuAyOTTgDwnDgR7LmcB";
        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress`;
        const response = await fetch(url);
        const data = await response.json();
        const location = data.location;
        setAddress({
          ...address,
          ip: data.ip,
          location: `${location.city}${
            location.region && `, ${location.region}`
          }${location.postalCode && `, ${location.postalCode}`}`,
          timezone: `UTC ${location.timezone}`,
          isp: data.isp,
          latitude: location.lat,
          longitude: location.lng,
        });
        // console.log("response: ", data);
      } catch (error) {
        console.log(error);
      }
    };

    getAddress();
  }, []);

  async function getEnteredAddress(): Promise<void> {
    try {
      const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
      const domainRegex = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/;
      const API_KEY = "at_9XzGo7SAsjTuAyOTTgDwnDgR7LmcB";
      const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&${
        ipRegex.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : domainRegex.test(ipAddress)
          ? `domain=${ipAddress}`
          : "ipAddress"
      }`;
      console.log("getEnteredAddress ~ url:", url);
      const response = await fetch(url);
      const data = await response.json();
      const location = data.location;
      console.log("getEnteredAddress ~ data:", data);
      setAddress({
        ...address,
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
  }

  const handleSearch = (e: React.MouseEvent): void => {
    console.log("veikia funkcja");

    e.preventDefault();
    getEnteredAddress();
  };

  useEffect(() => {
    console.log("useEffect ~ address:", address);
  }, [address]);

  return (
    <>
      <GlobalStyle />
      <AppDiv>
        <Title>IP Address Tracker</Title>
        <InputWithButton
          ipAddress={ipAddress}
          setIpAddress={setIpAddress}
          handleSearch={handleSearch}
        />
        <DataSheet address={address}></DataSheet>
        <MapContainer
          center={[address.latitude, address.longitude]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "900px", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPlace address={address}></MarkerPlace>
        </MapContainer>
      </AppDiv>
    </>
  );
}

export default App;
